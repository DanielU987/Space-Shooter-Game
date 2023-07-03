var jet = document.getElementById("jet");
var board = document.getElementById("board");

function startGame(stuf) {
  window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
      jet.style.left = left - 25 + "px";
    }
    else if (e.key == "ArrowRight" && left <= 460) {
      jet.style.left = left + 25 + "px";
    }

    if (e.key == "ArrowUp") {
      var bullet = document.createElement("div");
      bullet.classList.add("bullets");
      board.appendChild(bullet);

      var movebullet = setInterval(() => {
        var rocks = document.getElementsByClassName("rocks");

        for (var i = 0; i < rocks.length; i++) {
          var rock = rocks[i];
          if (rock != undefined) {
            var rockbound = rock.getBoundingClientRect();
            var bulletbound = bullet.getBoundingClientRect();

            if (
              bulletbound.left >= rockbound.left &&
              bulletbound.right <= rockbound.right &&
              bulletbound.top <= rockbound.top &&
              bulletbound.bottom <= rockbound.bottom
            ) {
              rock.parentElement.removeChild(rock);

              document.getElementById("points").innerHTML =
                parseInt(document.getElementById("points").innerHTML) + 1;
            }
          }
        }
        var bulletbottom = parseInt(
          window.getComputedStyle(bullet).getPropertyValue("bottom")
        );

        if (bulletbottom >= 600) {
          clearInterval(movebullet);
        }

        bullet.style.left = left + "px";
        bullet.style.bottom = bulletbottom + 3 + "px";
      });
    }
  });




  var generaterocks = setInterval(() => {
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    var rockleft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );
    rock.style.left = Math.floor(Math.random() * 450) + "px";

    board.appendChild(rock);
  }, 1000);

  var moverocks = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");

    if (rocks != undefined) {
      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        var rocktop = parseInt(
          window.getComputedStyle(rock).getPropertyValue("top")
        );
        if (rocktop >= 475) {
          alert("Game Over");
          clearInterval(moverocks);
          window.location.reload();
        }

        rock.style.top = rocktop + 1 + "px";
      }
    }
  }, 20);
  document.getElementById("board").style = "visibility:visible;"
  document.getElementById("jet").style = "visibility:visible;"
  document.getElementById("ebala").remove();
}
