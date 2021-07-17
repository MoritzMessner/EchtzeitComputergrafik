//some helper functions here
function fractionate(val, minVal, maxVal) {
    return (val - minVal) / (maxVal - minVal);
}

function modulate(val, minVal, maxVal, outMin, outMax) {
    let fr = fractionate(val, minVal, maxVal);
    let delta = outMax - outMin;
    return outMin + (fr * delta);
}

function avg(arr) {
    let total = arr.reduce(function (sum, b) {
        return sum + b;
    });
    return (total / arr.length);
}

function max(arr) {
    return arr.reduce(function (a, b) {
        return Math.max(a, b);
    })
}

function getAmountOfMaxValues(arr, _val) {
    return arr.filter(x => x >= _val).length;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Audio
function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();
}

document.getElementById("upload").addEventListener("change", handleFiles, false);