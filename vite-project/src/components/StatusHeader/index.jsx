import "./index.css"

const StatusHeader=(props)=>{
    const {isclicked,details,updateId}=props
    const {statusId,statusLang}=details
    const updateid=()=>{
        updateId(statusId)
    }
    const isBtnClicked=isclicked===statusId?'clicked' : 'filteritems'
return (<li>
    <button type="button" className={isBtnClicked} onClick={updateid}>{statusLang}</button>
</li>)
}
export default StatusHeader