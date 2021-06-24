import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '../Components/CustomButton';
import CustomItem from '../Components/CustomItem';
import TheModal from '../Components/TheModal';
import LoaderOverlay from '../common/loaderOverLay';
import { loginServices } from '../services/loginServices';
import { DocumentSharingServices } from '../services/DocumentSharingServices';
import { inject, observer } from 'mobx-react';
import { toJS, observable } from 'mobx';
import AlertModal from '../common/AlertModal';
// import downloadManager from 'react-native-simple-download-manager'


const source = {
    jpg: require('../Assets/jpg.png'),
    png: require('../Assets/png.png'),
    pdf: require('../Assets/pdf.png'),
    doc: require('../Assets/docImage.png')

}

type documentProps = {
    login: loginServices
    document: DocumentSharingServices
}

@inject('login')
@inject('document')
@observer
export default class DocumentScreen extends Component<documentProps> {
    @observable
    source = source.doc;

    @observable
    imageButtonText = 'Upload Image'

    @observable
    fileButtontext = 'Upload File'

    @observable
    loading = false
    @observable
    loadingText = 'Loading Documents...'

    @observable
    document = {}

    @observable
    error = false

    @observable
    errorMessage = ''

    @observable
    showResponse = false

    @observable
    modalVisible = false

    state = {
        Note: 'Note',
    };

    downloadFile(url_: string, filename: string, title: string, Note: string) {

        // const config_ = {
        //     downloadTitle: title,
        //     downloadDescription: Note,
        //     saveAsName: filename,
        //     allowedInRoaming: true,
        //     allowedInMetered: true,
        //     showInDownloads: true,
        //     external: false, //when false basically means use the default Download path (version ^1.3)
        //     path: "Download/" //if "external" is true then use this path (version ^1.3)
        // };
        // return downloadManager
        //     .download((url = url_), (headers = {}), (config = config_))
        //     .then(response => {
        //         this.error = false
        //         this.errorMessage = 'Download Successful'
        //         this.showResponse = true
        //         console.log("Download success!");
        //     })
        //     .catch(err => {
        //         this.error = true
        //         this.errorMessage = 'Download Failed'
        //         this.showResponse = true
        //         console.log("Download failed!");
        //     });
    }

    renderDocumentsList() {
        if (this.props.document.Documents.length === 0) {
            return (
                <View style={{ width:'100%',height:hp('60%'), alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: wp('8%'), fontWeight: 'bold' }}>No Documents Yet</Text>
                </View>
            )
        }
        return (
            this.props.document.Documents.map(element => {
                let sender = '';
                let date = new Date(element.CreatedAt).toDateString();
                let time = new Date(element.CreatedAt).toLocaleTimeString()
                let color = null;
                let image = source.doc
                let style = null;
                if (element.Type === 'application/pdf') {
                    image = source.pdf
                } else if (element.Type === 'image/jpeg') {
                    image = source.jpg
                } else if (element.Type === 'image/png') {
                    image = source.png
                }

                if (element.From === this.props.login.customerId) {
                    sender = `You`
                    color = { color: '#218721' }
                    style = { marginLeft: wp('30%') }
                } else {
                    sender = `${element.From}`
                    color = { color: '#132F58' }
                    style = { marginRight: wp('30%') }
                }
                return (
                    <CustomItem
                        onPress={() => this.downloadFile(`http://192.168.1.5:3001/api/documents/files/${element.fileId}`, element.fileId, element.fileId, element.Note)}
                        key={element._id}
                        renderImage={true}
                        Image={image}
                        TopText={sender}
                        date={date}
                        Note={true}
                        body={element.Note}
                        color={color}
                        time={time}
                        Style={style}
                        title={'Note:'}
                    />
                )
            })
        )
    }
    
    handleSubmit() {
        if (this.document === undefined) {
            this.error = true
            this.errorMessage = 'No Document Selected'
            return
        }
        if (this.state.Note === 'Note') {
            this.error = true
            this.errorMessage = 'No Note'
            return
        }
    }

    sendDocument = async () => {
        this.handleSubmit()
        if (this.error) {
            this.modalVisible = false
            this.showResponse = true
            this.error = true
            return
        }
        this.loading = true;
        this.loadingText = 'Sending..'
        this.modalVisible = false
        let doc = toJS(this.document);
        const result = await this.props.document.sendDocument(doc, this.props.login.customerId, this.state.Note,this.props.login.fullName,this.props.login.userEmail,this.props.login.userMobile);
        if (result.status === 200) {
            this.showResponse = true
            this.errorMessage = 'Successfully Sent'
            this.error = false;
            this.fileButtontext = 'Upload File';
            this.imageButtonText = 'Upload Image';
            this.document = {};
            this.source = source.doc;
            await this.props.document.getUserDocuments(this.props.login.customerId);
            this.loading = false;
        } else {
            this.showResponse = true
            this.loading = false;
            this.errorMessage = result.data
            this.error = true
        }
    }

    handleImageUpload = () => {
        return ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);

            let fileName: string = image.path;
            let names: string[] = fileName.split('/');
            let name = names[names.length - 1].substring(25);
            let document = {
                name: name,
                type: image.mime,
                uri: image.path
            }
            this.fileButtontext = 'Upload File'
            this.imageButtonText = name;
            this.document = document;
            if (image.mime === 'image/jpeg') {
                this.source = source.jpg
            } else if (image.mime === 'image/png') {
                this.source = source.png
            } else {
                this.source = source.doc
            }

        });
    }

    handleFileUpload = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(
                res
            );
            this.imageButtonText = 'Upload Image'
            this.fileButtontext = res.name;
            this.document = res
            if (res.type === 'application/pdf') {
                this.source = source.pdf
            } else if (res.type === 'image/jpeg') {
                this.source = source.jpg
            } else if (res.type === 'image/png') {
                this.source = source.png
            } else {
                this.source = source.doc
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(`user cancelled`);
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
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

    renderTheModal() {
        return (
            <TheModal
                ImageSource={this.source}
                visible={this.modalVisible}
                close={() => {
                    this.source = source.doc
                    this.fileButtontext = 'Upload File'
                    this.imageButtonText = 'Upload Image'
                    this.modalVisible = false
                    this.setState({ Note:'Note'})
                }}
                Note={this.state.Note}
                onChangeText={(Note) => this.setState({ Note })}
                imageButtonText={this.imageButtonText}
                fileButtonText={this.fileButtontext}
                uploadFile={this.handleFileUpload}
                uploadImage={this.handleImageUpload}
                onSend={this.sendDocument}
            />
        )
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
            <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: hp('3%') }}>
                <CustomButton
                    onPress={() => this.modalVisible = true}
                    Style={styles.uploadButton}
                    renderIcon={true}
                    textStyle={{ width:'73%',  marginLeft: wp('1%'), fontWeight: 'bold', fontSize:15 }}
                    Icon={require('../Assets/send.png')}
                >Send Document</CustomButton>
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: hp('5%'), marginTop: hp('2%'), paddingLeft: wp('2%'), paddingRight: wp('2%') }} >
                    {this.renderDocumentsList()}
                </ScrollView>
                {this.renderTheModal()}
                {this.renderAlertModal()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uploadButton: {
        backgroundColor: '#fff',
        width:'45%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: '#F3D55B',
        borderWidth: 1,
        borderLeftWidth: 0,
    }
})
