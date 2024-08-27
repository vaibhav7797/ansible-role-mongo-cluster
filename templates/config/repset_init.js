// todo check if use auth
var rsStatus = rs.status().ok;
print('rsStatus: ' + rsStatus);
if(!rsStatus) {
    print('init rs');
    rs.initiate();
    sleep(5000);
    print('done init rs');
}
