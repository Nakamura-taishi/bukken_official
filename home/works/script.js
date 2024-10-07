const button = document.querySelector("#g138_button");
const intro_138 = document.querySelector("#138_intro");



intro_138.style.display = "none";
button.addEventListener('click',()=>{
    if(intro_138.style.display == "none"){
        intro_138.style.display = "block";
        window.requestAnimationFrame(step);

    }else{
        intro_138.style.display = "none";
        start = undefined;
        done = false;

    }
},false);


let picture;
let start, previousTimeStamp;
let done = false;



function slideIn(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // ここで Math.min() を使用して、要素がちょうど 200px で止まるようにします。
    const count = Math.min(0.1 * elapsed, 200);
    picture.style.transform = `translateX(${count}px)`;
    if (count === 200) done = true;
  }

  if (elapsed < 2000) {
    // Stop the animation after 2 seconds
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(slideIn);
    }
  }
}

function slideOut(timestamp){
    if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
    
      if (previousTimeStamp !== timestamp) {
        // ここで Math.min() を使用して、要素がちょうど 200px で止まるようにします。
        const count = Math.max(200 - 0.1 * elapsed, 0);
        picture.style.transform = `translateX(${count}px)`;
        if (count === 0) done = true;
      }
    
      if (elapsed < 2000) {
        // Stop the animation after 2 seconds
        previousTimeStamp = timestamp;
        if (!done) {
          window.requestAnimationFrame(slideOut);
        }
      }
}

//引数は学年の数字（string）
function open(current,next){

}

function close(current){
    document.querySelector(`#${current}_intro`).style.display = "none";
    picture = document.querySelector(`#${current}_pic`);
    window.requestAnimationFrame(slideOut);
    start = undefined;
    done = false;
}