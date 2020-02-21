let varWorkflowUrl;
if(process.env.NODE_ENV ==="development" ){
    varWorkflowUrl="http://localhost:8101/workflowManager/";
}
else{
    varWorkflowUrl="https://it.jisu8.cn:9999/workflowManager/";
}
const workflowUrl=varWorkflowUrl;
const ssoUrl="http://localhost:8101/sso/";

export {
    workflowUrl,ssoUrl
}