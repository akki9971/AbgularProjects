/* custom javascript */

setTimeout(function () {

    var mobileTabView = window.matchMedia('(min-width:300px) and (max-width: 991px)');
    if (mobileTabView.matches) {
        document.getElementById('sidebar-event').onclick = function () {
            document.getElementById('sidebarClose').click();
        }
    }

}, 2000)


