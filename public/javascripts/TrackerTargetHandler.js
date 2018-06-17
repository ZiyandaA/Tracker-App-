function getTrackerTargets(id) {
    return fetch('http://localhost:3000/trackertargets?tracker_id=' + trackerid)
        .then(data => {
            return data.json();
        })
}

function postTrackertarget(trackerID, target, value,date) {
    return axios.post("http://localhost:3000/trackertargets", {
        TrackerTarget = {
            trackerID: trackerID,
            target: target,
            value: value,
            date: Date.now(),
    })
}


function onCreateTrackertarget() {

    const name = $('#trackertarget-input').val();

    postTrackertarget(window.trackerID, target, value,date))
    .then(newTrackertarget => {


        $('#trackertargets').empty()
        getTrackertargets(window.TrackerID)
            .then(data => {
              fillTrackertargets(data.trackertargets)  
            })
            .catch(err => {
                console.log(err, 'this is error')
            })
    })
}

$(document).ready(() => {
    $('#trackertarget-submit').click(onCreateTrackertarget)
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/find-me')
        .then(data => {
            console.log(data, 'this is data')

            return getTrackertargets(data.data._trackerid)
        })
        .then(data => {
            console.log(data.trackertargets, 'this is trackertargets array');
            fillTrackertargets(data.trackertargets);
            
        })
});

function fillTrackertargets(trackertargets) {

    trackertargets.forEach(elem => {
        $('#trackertargets').append(`<div class="trackertarget">${elem.TrackerID}</div>`);
        elem.trackertargetTargets.forEach()
    })

}



