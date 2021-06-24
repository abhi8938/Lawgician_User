import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, PermissionsAndroid, Platform, ScrollView } from 'react-native'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import PDFView from 'react-native-view-pdf/lib/index';
import { invoice } from './../constants/invoice';
import CustomButton from './../Components/CustomButton';
import CustomTextInput from '../Components/CustomTextInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InvoiceItem from './../Components/InvoiceItem';
import InvoiceInput from './../Components/InvoiceInput';
import AlertModal from './../common/AlertModal';
import LoaderOverlay from './../common/loaderOverLay';
@observer
export default class BillingScreen extends Component {

    @observable
    error = false

    @observable
    errorMessage = ''

    @observable
    showResponse = false

    @observable
    loading = false

    @observable
    loadingText = 'Generating Invoice...'

    @observable
    Items: object[] = [];

    @observable
    qty: string = '1'

    @observable
    item: string = 'Item Name'

    @observable
    additional: string = 'Note'

    @observable
    price: string = 'Price'

    @observable
    loading: boolean = false;

    @observable
    filePath: string;

    @observable
    fromName: string = 'Name';

    @observable
    fromEmail: string = 'Email';

    @observable
    fromMobile: string = 'Mobile';

    @observable
    clientName: string = 'Name';

    @observable
    clientEmail: string = 'Email';

    @observable
    clientMobile: string = 'Mobile';

    @observable
    invoiceNumber: string = '0';

    @observable
    showPDF: boolean = false;

    @observable
    description: string = 'Notes, any relevant info, terms,payment instructions,etc.'

    @observable
    Tax: string = '0';

    @observable
    showInput: boolean = false;

    @observable
    amount: string = '0'

    askPermission() {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Lawgician App External Storage Write Permission',
                        message: 'Lawgician App needs access to Storage data in your SD Card ',
                        buttonPositive: 'accept'
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.createPDF();
                } else {
                    Alert.alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                Alert.alert('Write permission err', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            this.createPDF();
        }
    }

    handleSubmissionError() {
        if (this.fromName === 'Name') {
            this.error = true;
            this.errorMessage = 'Please enter creater name'
            return
        }
        if (this.fromEmail === 'Email') {
            this.error = true;
        
            this.errorMessage = 'Please  enter creater email'
            return
        }
        if (this.fromMobile === 'Mobile' || this.fromMobile.length < 10) {
            this.error = true;
          
            this.errorMessage = 'Invalid creater mobile'
            return
        }
        if (this.clientName === 'Name') {
            this.error = true;
            
            this.errorMessage = 'Please enter client name'
            return
        }
        if (this.clientMobile === 'Mobile') {
            this.error = true;
            
            this.errorMessage = 'Invalid client mobile'
            return
        }
        if (this.clientEmail === 'Email') {
            this.error = true;
           
            this.errorMessage = 'Please enter client email'
            return
        }
        if (this.invoiceNumber === '0') {
            this.error = true;
         
            this.errorMessage = 'Please Invoice Number'
            return
        }
        if(this.Items.length === 0){
            this.error = true;
        
            this.errorMessage = 'Please Add Atleast 1 Item'
            return
        }
    }

    createPDF = async () => {
        this.handleSubmissionError()
        if (this.error === true) {
            this.showResponse = true
            this.error = false
            return
        }
        this.loading = true
        this.loadingText = 'Generating Invoice..'
        let date = new Date();
      console.log(`data`,date.toDateString(), this.fromName, this.fromEmail, this.fromMobile, this.clientName, this.clientEmail, this.clientMobile, this.invoiceNumber, this.Items, this.Tax,this.description)
        const options = {
            html: invoice(date.toDateString(), this.fromName, this.fromEmail, this.fromMobile, this.clientName, this.clientEmail, this.clientMobile, this.invoiceNumber, this.Items, this.Tax,this.description),
            fileName: `INV##${this.invoiceNumber}-${this.clientName}`,
            directory: 'Invoices',
        };
try{
    const file = await RNHTMLtoPDF.convert(options)
    this.filePath = file.filePath
    this.showPDF = true
    this.loading = false
}catch(error) {
    this.error = true
    this.errorMessage = error
    this.loading = false
    this.showResponse =true
    return
}
              
    }

    renderPDF() {
        const resources = {
            file: this.filePath,
            url: `file://${this.filePath}`,
            base64: '',
        };

        const resourceType = 'file';
        if (this.filePath === undefined || this.showPDF === false) {
            return
        }

        return (
            <View style={{ flex: 1 }}>
                <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    resource={resources[resourceType]}
                    resourceType={resourceType}
                    onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                    onError={(error) => console.log('Cannot render PDF', error)}

                />
                <CustomButton
                    Style={styles.button}
                    textStyle={{ fontSize: 20, color:'#fff' }}
                    renderIcon={false}
                    onPress={() => this.showPDF = false}
                >Generate New</CustomButton>
            </View>
        )
    }

    renderList() {
        if (this.Items.length === 0) {
            return
        }
        return (this.Items.map(item => {
            return (
                <InvoiceItem
                    key={item.key}
                    Style={{ width: '99%', flexDirection: 'row', justifyContent: 'center', borderRadius: 5, padding: 10, borderBottomColor: 'rgba(85,85,85,0.5)', borderBottomWidth: 0.5 }}
                    description={item.item}
                    price={item.price}
                    qty={item.qty}
                    amount={item.price * item.qty}
                    textStyle={{ color: '#000', fontSize: 14, padding: 0, alignSelf: 'stretch' }}
                />
            )
        }))
    }

    renderItem() {
        return (
            <View style={{ marginBottom: 12, }}>
                <Text style={{ alignSelf: 'flex-start', margin: '2%', fontSize: 17, fontWeight: 'bold' }}>Items</Text>
                <InvoiceItem
                    Style={{ backgroundColor: '#555555', width: '99%', flexDirection: 'row', justifyContent: 'center', borderRadius: 5, padding: 10 }}
                    description='Description'
                    price='Price'
                    qty='Qty'
                    amount='Amount'
                    textStyle={{ color: '#ffff', fontSize: 15, padding: 0, alignSelf: 'stretch' }}
                />
                {this.renderList()}
            </View>
        )
    }

    handleItemSubmission(){
        if(this.item === 'Item Name'){
            this.error = true;
            this.errorMessage = 'Item name can not be empty'
        return
        }
        if(this.price === 'Price'){
            this.error = true;
            this.errorMessage = 'Item price can not be empty'
            return
        }
    }

    AddItem= () =>{
        if(this.showInput === false){
            this.showInput = true
            return
            }else if(this.showInput === true){
                this.handleItemSubmission()
                console.log(`this.items`,this.Items.length, this.showResponse, this.error, this.errorMessage)
                if (this.error === true) {
                    this.showResponse = true
                    this.error = false
                    return
                }
                let additional = this.additional
                if(this.additional === 'Note'){
                    additional = ''
                }
            const item ={
                key: this.Items.length + 1,
                item: this.item,
                description: additional,
                qty: parseInt(this.qty),
                price: parseInt(this.price)
            }

            this.Items.push(item);
            this.item = '';
            this.additional = '';
            this.price = '';
            this.qty = '1';
            this.amount = '';
        }

    }
    renderInputItem() {
        if (this.showInput === true) {
            return (
                <InvoiceInput
                onFocusItem={() => { if(this.item === 'Item Name'){ return this.item = ''} return}}  
                onBLurItem={() => { if(this.item !== ''){ return} if(this.item === ''){ this.item = 'Item Name'}}}
                onFocusPrice={() => { if(this.price === 'Price'){ return this.price = ''} return}}  
                onBLurPrice={() => { if(this.price !== ''){ return} if(this.price === ''){ this.price = 'Price'}}}
                onFocusQty={() => { if(this.qty === '1'){ return this.qty = ''} return}}  
                onBlurQty={() => { if(this.qty !== ''){ return} if(this.qty === ''){ this.qty = '1'}}}
                onFocusAdditional={() => { if(this.additional === 'Note'){ return this.additional = ''} return}}  
                onBlurAdditional={() => { if(this.additional !== ''){ return} if(this.additional === ''){ this.additional = 'Note'}}}
                    onChangeAdditional={(additional: string) => this.additional = additional}
                    onChangeItem={(item: string) => this.item = item}
                    onChangePrice={(Price: string) => {
                        this.price = Price
                        this.amount = (parseInt(this.price) * parseInt(this.qty)).toString()
                    }}
                    onChangeQty={(qty: string) => this.qty = qty}
                    item={this.item}
                    additional={this.additional}
                    price={this.price}
                    qty={this.qty}
                    amount={this.amount}
                />
            )
        }
    }

    renderInvoiceInput() {
        if (this.showPDF === true) {
            return
        }
        return (
            <ScrollView contentContainerStyle={{ paddingLeft: '2%', paddingTop: '4%', width: '100%', }}>
                <CustomTextInput
                 onFocus={() => { if(this.invoiceNumber === '0'){ return this.invoiceNumber = ''} return}}  
                 onBlur={() => { if(this.invoiceNumber !== ''){ return} if(this.invoiceNumber === ''){ this.invoiceNumber = '0'}}}
                    containerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                    style={[styles.textInput, { width: '34%', textAlign: 'center' ,paddingLeft:3}]}
                    value={this.invoiceNumber}
                    labelText='INVOICE NO.'
                    Label={true}
                    labelStyle={{ fontSize: 16, marginRight: '3%' }}
                    onChangeText={(invoiceNumber: string) => this.invoiceNumber = invoiceNumber}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.insideContainer}>
                        <Text style={styles.heading}>From</Text>
                        <CustomTextInput
                         onFocus={() => { if(this.fromName === 'Name'){ return this.fromName = ''} return}}  
                         onBlur={() => { if(this.fromName !== ''){ return} if(this.fromName === ''){ this.fromName = 'Name'}}}
                            style={styles.textInput}
                            value={this.fromName}
                            onChangeText={(fromName: string) => this.fromName = fromName}
                        />
                        <CustomTextInput
                              onFocus={() => { if(this.fromEmail === 'Email'){ return this.fromEmail = ''} return}}  
                              onBlur={() => { if(this.fromEmail !== ''){ return} if(this.fromEmail === ''){ this.fromEmail = 'Email'}}}
                            style={styles.textInput}
                            value={this.fromEmail}
                            onChangeText={(fromEmail: string) => this.fromEmail = fromEmail}
                        />
                        <CustomTextInput
                              onFocus={() => { if(this.fromMobile === 'Mobile'){ return this.fromMobile = ''} return}}  
                              onBlur={() => { if(this.fromMobile !== ''){ return} if(this.fromMobile === ''){ this.fromMobile = 'Mobile'}}}
                            style={styles.textInput}
                            value={this.fromMobile}
                            onChangeText={(fromMobile: string) => this.fromMobile = fromMobile}
                        />
                    </View>
                    <View style={styles.insideContainer}>
                        <Text style={[styles.heading]}>To</Text>
                        <CustomTextInput
                              onFocus={() => { if(this.clientName === 'Name'){ return this.clientName = ''} return}}  
                              onBlur={() => { if(this.clientName !== ''){ return} if(this.clientName === ''){ this.clientName = 'Name'}}}
                            style={styles.textInput}
                            value={this.clientName}
                            onChangeText={(clientName: string) => this.clientName = clientName}
                        />
                        <CustomTextInput
                              onFocus={() => { if(this.clientEmail === 'Email'){ return this.clientEmail = ''} return}}  
                              onBlur={() => { if(this.clientEmail !== ''){ return} if(this.clientEmail === ''){ this.clientEmail = 'Email'}}}
                            style={styles.textInput}
                            value={this.clientEmail}
                            onChangeText={(clientEmail: string) => this.clientEmail = clientEmail}
                        />
                        <CustomTextInput
                              onFocus={() => { if(this.clientMobile === 'Mobile'){ return this.clientMobile = ''} return}}  
                              onBlur={() => { if(this.clientMobile !== ''){ return} if(this.clientMobile === ''){ this.clientMobile = 'Mobile'}}}
                            style={styles.textInput}
                            value={this.clientMobile}
                            onChangeText={(clientMobile: string) => this.clientMobile = clientMobile}
                        />
                    </View>
                </View>
                {this.renderItem()}
                {this.renderInputItem()}
                <CustomButton
                    Style={styles.button}
                    textStyle={{ fontSize: 20, color:'#fff' }}
                    renderIcon={false}
                    onPress={this.AddItem}
                >Add Item</CustomButton>
                <CustomTextInput
                      onFocus={() => { if(this.Tax === '0'){ return this.Tax = ''} return}}  
                      onBlur={() => { if(this.Tax !== ''){ return} if(this.Tax === ''){ this.Tax = '0'}}}
                    containerStyle={{ flexDirection: 'row', alignItems: 'center', }}
                    style={[styles.textInput, { width: '34%', textAlign: 'center',paddingLeft:3 }]}
                    value={this.Tax}
                    labelText='Tax(%):'
                    Label={true}
                    labelStyle={{ fontSize: 16, marginRight: '3%' }}
                    onChangeText={(Tax: string) => this.Tax = Tax}
                />
                <CustomTextInput
                      onFocus={() => { if(this.description === 'Notes, any relevant info, terms,payment instructions,etc.'){ return this.description = ''} return}}  
                      onBlur={() => { if(this.description !== ''){ return} if(this.description === ''){ this.description = 'Notes, any relevant info, terms,payment instructions,etc.'}}}
                    containerStyle={{ width: '90%' }}
                    style={[styles.textInput, { textAlignVertical: 'top', paddingTop: '2%', paddingLeft: '3%' }]}
                    value={this.description}
                    labelText='Note:'
                    Label={true}
                    labelStyle={{ fontSize: 16, marginRight: '4%' }}
                    onChangeText={(description: string) => this.description = description}
                    lines={4}
                    multiline={true}
                />
                <CustomButton
                    Style={styles.button}
                    textStyle={{ fontSize: 20, color:'#fff' }}
                    renderIcon={false}
                    onPress={this.askPermission.bind(this)}
                >Generate</CustomButton>
                {this.renderAlertModal()}
            </ScrollView>
        )

    }

    renderAlertModal() {
        return (
            <AlertModal
                visible={this.showResponse}
                onRequestClose={() => this.showResponse = false}
                error={this.error}
                response={this.errorMessage}
            />
        );
    }

    renderLoader() {
        return (
            <LoaderOverlay label={this.loadingText} />
        )
    }

    render() {
        if (this.loading) {
            return this.renderLoader()
        }
        return (
            <View style={styles.container}>
                {this.renderPDF()}
                {this.renderInvoiceInput()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        margin: '5%',
        fontSize: 18
    },
    button: {
        width: '40%',
        backgroundColor: 'rgba(85,85,85,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        alignSelf: 'center',
        borderRadius: 5
    },
    insideContainer: {
        width: '50%',
    },
    textInput: {
        width: '94%',
        fontSize: 16,
        backgroundColor: 'rgba(85,85,85,0.2)',
        padding: 2.5,
        marginBottom: '3%'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
