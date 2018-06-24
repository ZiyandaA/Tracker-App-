function getTrackers(id) {
    return fetch('http://localhost:3000/users/' + id)
        .then(data => {
            return data.json();
        })
}

function postTracker(id, name) {
    return axios.post("http://localhost:3000/trackers", {
        userID: id,
        name: name
    })
}


function onCreateTracker() {
  

    const name = $('#tracker-input').val();
    if (name !== '') {
        postTracker(window.ID, name)
        .then(newTracker => {
        

            $('#trackers').empty()
            getTrackers(window.ID)
                .then(data => {
                fillTrackers(data.trackers)  
                })
                .catch(err => {
                    console.log(err, 'this is error')
                })
        })
    }

    
}


$(document).ready(() => {
    $('#tracker-submit').click(onCreateTracker)
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/find-me')
        .then(data => {
            return getTrackers(data.data._id)
        })
        .then(data => {
            fillTrackers(data.trackers);
            
        })
});


function addInputs(id, elem) {
    console.log($(this).parent().attr("id"));
    let trackerID = id || $(this).parent().parent().attr("id");
    if ($("#" + trackerID + "> input").css("display") === "none") {

        $("#" + trackerID + "> input").css("display", "block");
        $("#" + trackerID + "> button").css("display", "block");

        if(elem) {
            $("#" + trackerID + ">.name-input").val(elem.name);
            $("#" + trackerID + ">.target-input").val(elem.target);
            $("#" + trackerID + ">.value-input").val(elem.value);
            $("#" + trackerID + ">.tracker-target-input").val(elem._id);
        }
    }
    else {
        $("#" + trackerID + "> input").css("display", "none");
        $("#" + trackerID + "> .add-child").css("display", "none");

        $("#" + trackerID + ">.name-input").val("");
        $("#" + trackerID + ">.target-input").val("");
        $("#" + trackerID + ">.value-input").val("");
        $("#" + trackerID + ">.tracker-target-input").val("");
}
    

}


function onUpdateTracker() {

}


function onDeleteTracker() {
   
    let trackerID = $(this).parent().parent().attr("id");
    axios.delete("http://localhost:3000/trackers/" + trackerID) //localhost:3000/tracker/
        .then(data => {
            $('#trackers').empty();
            return getTrackers(window.ID)
        })
        .then(data => {
            fillTrackers(data.trackers);
        })

}

function addTrackerTarget() {
  
    let trackerID = $(this).parent().attr("id");
    const name = $("#" + trackerID + ">.name-input").val();
    const target = $("#" + trackerID + ">.target-input").val();
    const value = $("#" + trackerID + ">.value-input").val();
    const targetID = $("#" + trackerID + ">.tracker-target-input").val();
    console.log(name, target, value);
    axios.post("http://localhost:3000/trackertargets", {
        trackerID: trackerID,
        name: name,
        target: target,
        value: value,
        targetID: targetID
    })
    .then(trackerTarget => {
        $('#trackers').empty()
        return getTrackers(window.ID)
    })
    .then(data => {
        fillTrackers(data.trackers)
    })
}

function showTrackerTargets() {
    console.log('im clicking')
    let trackerID = $(this).parent().parent().attr("id");
    let table = $("#" + trackerID + ">.tracker-target-table");
    if (table.css("display") === "none") {
        table.css("display", "inline-block");
    }
    else {
        table.css("display", "none")
    }
}


function deleteTrackerTarget(id) {
    axios.delete("http://localhost:3000/trackertargets/" + id) //localhost:3000/tracker/
        .then(data => {
            $('#trackers').empty();
            return getTrackers(window.ID)
        })
        .then(data => {
            fillTrackers(data.trackers);
        })
}

function fillTrackers(trackers) {

    trackers.forEach(elem => {
        console.log(elem, 'this is tracker')
        let id = elem._id;
        $('#trackers').append(`
        <div id=${id} class="tracker">
            <div class="name-container">
                <p class="tracker-name">
                    ${elem.name}
                </p>
                
                <button class="add-inputs crud-button"">+</button>
                <button class="delete crud-button">x</button>
            </div>
            
            <input class="name-input" style="display:none" placeholder="name" type="text">
            <input class="target-input" style="display:none" placeholder="target" type="text">
            <input class="value-input" style="display:none" placeholder="value" type="text">
            <input class="tracker-target-input" style="display:none" type="hidden">
            <button class="add-child" style="display:none">confirm</button>
            <table class="tracker-target-table">
                <tr>
                    <th>name</th>
                    <th>target</th>
                    <th>value</th>
                    <th>date</th>
                    <th>actions</th>
                </tr>
            </table>
        </div>
        `);
        console.log($("#" + id + ">.add-child"), 'tracker name')
        $("#" + id + "> .name-container > .tracker-name").click(showTrackerTargets);
        $("#" + id + "> .name-container > .add-inputs").click(addInputs);
        $("#" + id + ">.add-child").click(addTrackerTarget);
        $("#"+ id +"> .name-container > .delete").click(onDeleteTracker);
        elem.trackerTargets.forEach(elem => {
            console.log(new Date(elem.date).getHours())
            if (elem.name) {
                $("#" + id + " > table").append(`
                    <tr class="tracker-target">
                        <td>
                            ${elem.name}
                        </td>
                        <td>
                            ${elem.target}
                        </td>
                        <td>
                            ${elem.value}
                        </td>
                        <td>
                         ${formatDate(new Date(elem.date))}
                        </td>
                        <td>
                            <button onclick='addInputs("${id}", ${JSON.stringify(elem)})'>edit</button>
                            <button onclick='deleteTrackerTarget(\"${elem._id}\")'>delete</button>
                        </td>
                        
                    </tr>
                `)
            }
            

        })
    })

}

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

