function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log() {
  const log = document.getElementById("log");
  const logElement = document.createElement("p");
  const message = Array.from(arguments).join(" ");
  logElement.textContent = message;
  log.appendChild(logElement);
  console.log(message);
  log.classList.add("scroll-down");
}

async function main(numberTryingToReach, number, addamount, decrease) {
  log("Starting to try and reach", numberTryingToReach, `starting with ${number}. `, "Adding", addamount, `and decreasing by x${decrease}`, "every loop.");

  let timesadded = 0;
  let smalldecimals = 0;

  while (number < numberTryingToReach) {
    number = number + addamount;
    addamount = addamount * decrease;
    timesadded++

    if (addamount < 0.00000000000001) { // if smaller than 1e-14
      log("Iteration:", timesadded, "| Number:", number, "(May include decimals too small to display)");
      smalldecimals++
      if (smalldecimals >= 3) {
        log("Infinite Loop - Automatically Stopping (decimals are too small to calculate)");
        break;
      }
    } else {
      log("Iteration:", timesadded, "| Number:", number);
      smalldecimals = 0;
    }

    await delay(1)
  }

  if (smalldecimals < 3) {
    log("Definite Loop (Took", timesadded, "adds)");
  }
}

function startLoop() {
  main(
    parseFloat(document.getElementById('numberInput').value),
    parseFloat(document.getElementById('startingNumber').value),
    parseFloat(document.getElementById('addInput').value),
    parseFloat(document.getElementById('decreaseInput').value)
  );
}

const logContainer = document.getElementById('log');
function scrollToBottom() {
  logContainer.scrollTop = logContainer.scrollHeight;
}
logContainer.addEventListener('DOMNodeInserted', scrollToBottom);
