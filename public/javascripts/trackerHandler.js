function getTrackers(id) {
    return fetch('http://localhost:3000/trackers?user_id=' + id)
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

//pending, fullfild, rejected

//getTrackers()

function onCreateTracker() {
    //1. I need to get the value from the input to some var
    //2. get the userid from the window.ID
    //3. invoke the postTracker function with params abouve described
    //4. Refresh the trackers informations

    const name = $('#tracker-input').val();
    if (name !== '') {
        postTracker(window.ID, name)
        .then(newTracker => {
        //1. Clean the trackers block
        //2. Get all the user trackers
        //3. fill the trackers div

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


function addInputs() {
    console.log($(this).parent().attr("id"));
    let trackerID = $(this).parent().parent().attr("id");
    if ($("#" + trackerID + "> input").css("display") === "none") {

        $("#" + trackerID + "> input").css("display", "block");
        $("#" + trackerID + "> button").css("display", "block");
    }
    else {
        $("#" + trackerID + "> input").css("display", "none");
        $("#" + trackerID + "> .add-child").css("display", "none");
    }
    

}

function addTrackerTarget() {
    //1. get data from input (done)
    //2. call the request to add tracker target using axios
    //3. call the request to refresh the data
    let trackerID = $(this).parent().attr("id");
    const name = $("#" + trackerID + ">.name-input").val();
    const target = $("#" + trackerID + ">.target-input").val();
    const value = $("#" + trackerID + ">.value-input").val();
    console.log(name, target, value);
    axios.post("http://localhost:3000/trackertargets", {
        trackerID: trackerID,
        name: name,
        target: target,
        value: value
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
        table.css("display", "block");
    }
    else {
        table.css("display", "none")
    }
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
                
                <button class="add-inputs">+</button>
            </div>
            
            <input class="name-input" style="display:none" placeholder="name" type="text">
            <input class="target-input" style="display:none" placeholder="target" type="text">
            <input class="value-input" style="display:none" placeholder="value" type="text">
            <button class="add-child" style="display:none">confirm</button>
            <table class="tracker-target-table">
                <tr>
                    <th>name</th>
                    <th>target</th>
                    <th>value</th>
                    <th>date</th>
                </tr>
            </table>
        </div>
        `);
        console.log($("#" + id + ">.add-child"), 'tracker name')
        $("#" + id + "> .name-container > .tracker-name").click(showTrackerTargets);
        $("#" + id + "> .name-container > .add-inputs").click(addInputs);
        $("#" + id + ">.add-child").click(addTrackerTarget);
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

//1. I have data
//2. I have the #trackers div block
//3. I need to add blocks with trackersNames to trackers block
