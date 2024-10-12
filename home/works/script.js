const grades_box_RectData = document.querySelector("#grades").getBoundingClientRect();
const grades_li_sample_RectData = document.querySelector("#g138").getBoundingClientRect();
const buttons = document.querySelectorAll(".GradeButton");
const intros = document.querySelectorAll("#grades li div");
const movingImgs = document.querySelectorAll(".moving_img");


intros.forEach(intro => {
  intro.style.display = "none";
})
buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    next = FirstGradeNum + i;
    if (!done) {
      botherd = true;
    }
    done = !done;
    if (intros[i].style.display == "none") {
      open(current, next);
      current = next;
    } else {
      close(current);
    }
  }, false);

});


let picture;
let start, previousTimeStamp;
let done = true;
let botherd = false;
let current;
let next;
const movingPictureOffsetX = 100;
const PictureDirectionPosition = grades_li_sample_RectData.left + grades_li_sample_RectData.width + movingPictureOffsetX;
const PictureOriginPosition = grades_box_RectData.left + grades_box_RectData.width + movingPictureOffsetX;
const PictureMovingDistance = PictureOriginPosition - PictureDirectionPosition;
const PictureMoveSpeed = 0.01;
const FirstGradeNum = 138;

movingImgs.forEach(img => {
  img.style.transform = `translateX(${PictureOriginPosition}px)`;
})

function slideIn(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;


  if (previousTimeStamp !== timestamp) {
    const count = Math.min(PictureMovingDistance * (1 - 1 / (1 + elapsed * PictureMoveSpeed)) + 40, PictureMovingDistance);
    picture.style.transform = `translateX(${PictureOriginPosition - count}px)`;
    picture.style.opacity = `${count / PictureMovingDistance}`;

    if (count === PictureMovingDistance) {
      done = true;
    }
  }

  previousTimeStamp = timestamp;
  if (!done) {
    window.requestAnimationFrame(slideIn);
  } else {
    if (botherd) {
      done = false;
      botherd = false;
    } else {
      picture.style.transform = `translateX(${PictureDirectionPosition}px)`;
      picture.style.opacity = "1.0";
    }
  }

}

function slideOut(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    const count = Math.min(PictureMovingDistance * (1 - 1 / (1 + elapsed * PictureMoveSpeed)) + 40, PictureMovingDistance);

    picture.style.transform = `translateX(${PictureDirectionPosition + count}px)`;
    picture.style.opacity = `${(PictureMovingDistance - count) / PictureMovingDistance}`;
    if (count === PictureMovingDistance) {
      done = true;
    }
  }

  previousTimeStamp = timestamp;
  if (!done) {
    window.requestAnimationFrame(slideOut);
  } else {
    picture.style.transform = `translateX(${PictureOriginPosition}px)`;
    picture.style.opacity = "0.0";
    if (botherd) {
      done = false;
      botherd = false;
    }
  }

}

//引数は学年の数字（string）
function open(current, next) {
  if (current != undefined) {
    document.querySelector(`#g${current}_intro`).style.display = "none";
    picture = document.querySelector(`#g${current}_pic`);
    picture.style.transform = `translateX(${PictureOriginPosition})`;
    picture.style.opacity = "0.0";
    start = undefined;
  }
  document.querySelector(`#g${next}_intro`).style.display = "block";
  picture = document.querySelector(`#g${next}_pic`);
  window.requestAnimationFrame(slideIn);

}

function close(current) {
  document.querySelector(`#g${current}_intro`).style.display = "none";
  picture = document.querySelector(`#g${current}_pic`);
  window.requestAnimationFrame(slideOut);
  start = undefined;
}
