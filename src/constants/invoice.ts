export const invoice = (date:string,fromName:string,fromEmail:string,fromMobile:string,clientName:string,clientEmail:string,clientMobile:string,InvoiceNumber:string,Items:object[],taxpercent:string,Notes:string) => { 
    //TODO:calculate subtotal,Total,tax and update html data
    const subtotal = getSubtotal(Items)
    let tax = (parseInt(taxpercent)/100) * subtotal
    
    let html = `<div style="margin-left: 25px; padding-top: 30px; padding-bottom: 30px; font-family: 'Muli', sans-serif;">
<h1 style="color: #555555; margin-bottom: 50px;">Invoice</h1>
<div style="display: flex; width: 95%; justify-content: space-between; border-bottom: .9px solid rgba(85,85,85,0.5); padding-bottom: 20px;">
<div style="color: #555555;">
<h5 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">From</h5>
<h3 style="margin: 0px; margin-bottom: 10px;">${fromName}</h3>
<h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">${fromEmail}</h3>
<h3 style="margin: 0px; font-size: 14px; font-weight: normal;">+91-${fromMobile}</h3>
</div>
<div style="color: #555555;">
<h5 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">For</h5>
<h3 style="margin: 0px; margin-bottom: 10px;">${clientName}</h3>
<h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">${clientEmail}</h3>
<h3 style="margin: 0px; font-size: 14px; font-weight: normal;">+91-${clientMobile}</h3>
</div>
</div>
<div style="color: #555555; padding-top: 25px; padding-bottom: 25px;">
<div style="display: flex; margin: 0px; margin-bottom: 2px; font-size: 15px; font-weight: normal;">INVOICE NO.:
<h5 style="margin: 0.5px; margin-left: 6px; font-size: 15px;">${InvoiceNumber}</h5>
</div>
<div style="display: flex; margin: 0px; margin-bottom: 2px; font-size: 15px; font-weight: normal;">DATE:
<h5 style="margin: 0.5px; margin-left: 6px; font-size: 15px;">${date}</h5>
</div>
</div>
<div style="display: flex; width: 90%; justify-content: space-between; background-color: #555555; height: 30px; align-items: center; color: #ffffff; padding-left: 15px; padding-right: 15px;">
<div style="display: flex; width: 60%;">Description</div>
<div style="display: flex; width: 36%; justify-content: space-between; text-align: right;">
<h5 style="margin: 2px;">Price</h5>
<h5 style="margin: 2px; margin-right: 50px;">Qty</h5>
<h5 style="margin: 2px;">Amount</h5>
</div>
</div>
${getItemsHTML(Items)}
<div style="display: flex; width: 92.7%; justify-content: flex-end;">
<div style="display: flex; width: 35%; justify-content: space-between; margin-top: 10px;">
<h5 style="margin: 2px; font-weight: normal;">Subtotal</h5>
<h5 style="margin: 2px; font-weight: normal;">Rs.${subtotal}</h5>
</div>
</div>
<div style="display: flex; width: 92.7%; justify-content: flex-end;">
<div style="display: flex; width: 35%; justify-content: space-between;">
<h5 style="margin: 2px; font-weight: normal;">Tax(gst)</h5>
<h5 style="margin: 2px; font-weight: normal;">Rs.${tax}</h5>
</div>
</div>
<div style="display: flex; width: 92.7%; justify-content: flex-end;">
<div style="display: flex; width: 35%; justify-content: space-between; margin-top: 3px;">
<h5 style="margin: 2px;">Total</h5>
<h5 style="margin: 2px;">Rs.${subtotal + tax}</h5>
</div>
</div>
<div style="width: 95%; background-color: #555555; height: 1px; margin-top: 13px;">&nbsp;</div>
<h6 style="color: #555555;">${Notes}</h6>
<div style="display: flex; width: 92%; justify-content: flex-end; margin-top: 80px;">Authorized Signature</div>
</div>`
return html
}


const getItemsHTML = (Items:object[]) => {
    let html = ''

    Items.map(element =>{
        html = html + `<div style="display: flex; width: 90%; justify-content: space-between; align-items: center; border-bottom: .9px solid rgba(85,85,85,0.9); padding: 8px 15px 8px 15px;">
        <div style="width: 60%; font-size: 12px; height: 30px;">${element.item}
        <h5 style="margin: 0; font-size: 12px;">${element.description}</h5>
        </div>
        <div style="display: flex; width: 36%; justify-content: space-between; text-align: right;">
        <h5 style="margin: 2px; font-weight: normal;">Rs.${element.price}</h5>
        <h5 style="margin: 2px; margin-right: 50px; font-weight: normal;">${element.qty}</h5>
        <h5 style="margin: 2px; font-weight: normal;">Rs.${element.price * element.qty}</h5>
        </div>
        </div>`
    })

return html
}

const getSubtotal = (Items:object[]) =>{
   let subtotal = 0;
   Items.map(element => {
       subtotal = subtotal + (element.price * element.qty)
   }) 
   return subtotal
}
// `<div style="margin-left: 25px; padding-top: 30px; padding-bottom: 30px; font-family: 'Muli', sans-serif;">
// <h1 style="color: #555555; margin-bottom: 50px;">Invoice</h1>
// <div style="display: flex; width: 95%; justify-content: space-between; border-bottom: .9px solid rgba(85,85,85,0.5); padding-bottom: 20px;">
// <div style="color: #555555;">
// <h5 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">From</h5>
// <h3 style="margin: 0px; margin-bottom: 10px;">Bussiness Name</h3>
// <h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">Your@email.com</h3>
// <h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">your address</h3>
// <h3 style="margin: 0px; font-size: 14px; font-weight: normal;">+91-8527576449</h3>
// </div>
// <div style="color: #555555;">
// <h5 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">For</h5>
// <h3 style="margin: 0px; margin-bottom: 10px;">Client Name</h3>
// <h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">client@email.com</h3>
// <h3 style="margin: 0px; margin-bottom: 2px; font-size: 14px; font-weight: normal;">client address</h3>
// <h3 style="margin: 0px; font-size: 14px; font-weight: normal;">+91-8938801729</h3>
// </div>
// </div>
// <div style="color: #555555; padding-top: 25px; padding-bottom: 25px;">
// <div style="display: flex; margin: 0px; margin-bottom: 2px; font-size: 15px; font-weight: normal;">Number:
// <h5 style="margin: 0.5px; margin-left: 6px; font-size: 15px;">INV0004</h5>
// </div>
// <div style="display: flex; margin: 0px; margin-bottom: 2px; font-size: 15px; font-weight: normal;">Date:
// <h5 style="margin: 0.5px; margin-left: 6px; font-size: 15px;">01 Nov 2019</h5>
// </div>
// </div>
// <div style="display: flex; width: 90%; justify-content: space-between; background-color: #555555; height: 30px; align-items: center; color: #ffffff; padding-left: 15px; padding-right: 15px;">
// <div style="display: flex; width: 60%;">Description</div>
// <div style="display: flex; width: 36%; justify-content: space-between; text-align: right;">
// <h5 style="margin: 2px;">Price</h5>
// <h5 style="margin: 2px; margin-right: 50px;">Qty</h5>
// <h5 style="margin: 2px;">Amount</h5>
// </div>
// </div>
// <div style="display: flex; width: 90%; justify-content: space-between; align-items: center; border-bottom: .9px solid rgba(85,85,85,0.9); padding: 8px 15px 8px 15px;">
// <div style="width: 60%; font-size: 12px; height: 30px;">Line Item
// <h5 style="margin: 0; font-size: 12px;">additional details</h5>
// </div>
// <div style="display: flex; width: 36%; justify-content: space-between; text-align: right;">
// <h5 style="margin: 2px; font-weight: normal;">Rs.100</h5>
// <h5 style="margin: 2px; margin-right: 50px; font-weight: normal;">2</h5>
// <h5 style="margin: 2px; font-weight: normal;">Rs.200</h5>
// </div>
// </div>
// <div style="display: flex; width: 92.7%; justify-content: flex-end;">
// <div style="display: flex; width: 35%; justify-content: space-between; margin-top: 10px;">
// <h5 style="margin: 2px; font-weight: normal;">Subtotal</h5>
// <h5 style="margin: 2px; font-weight: normal;">Rs.200</h5>
// </div>
// </div>
// <div style="display: flex; width: 92.7%; justify-content: flex-end;">
// <div style="display: flex; width: 35%; justify-content: space-between;">
// <h5 style="margin: 2px; font-weight: normal;">Tax(gst)</h5>
// <h5 style="margin: 2px; font-weight: normal;">Rs.36</h5>
// </div>
// </div>
// <div style="display: flex; width: 92.7%; justify-content: flex-end;">
// <div style="display: flex; width: 35%; justify-content: space-between; margin-top: 3px;">
// <h5 style="margin: 2px;">Total</h5>
// <h5 style="margin: 2px;">Rs.236</h5>
// </div>
// </div>
// <div style="width: 95%; background-color: #555555; height: 1px; margin-top: 13px;">&nbsp;</div>
// <h6 style="color: #555555;">Notes, any relevant info, terms,payment instructions,etc.</h6>
// <div style="display: flex; width: 92%; justify-content: flex-end; margin-top: 80px;">Authorized Signature</div>
// </div>`