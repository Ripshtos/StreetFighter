const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/background1.png",
});

const flag = new Sprite({
  // simple flag animation
  position: {
    x: 757,
    y: 209,
  },
  imgSrc: "./img/flag.png",
  framemax: 3,
  scale: 1.5,
});

const men = new Sprite({
  // simple man on boat animation
  position: {
    x: 150,
    y: 337,
  },
  imgSrc: "./img/MEN.png",
  framemax: 3,
  scale: 1.5,
});

const women = new Sprite({
  // simple woman on boat animation
  position: {
    x: 238,
    y: 333,
  },
  imgSrc: "./img/WOMEN.png",
  framemax: 3,
  scale: 1.45,
});

const sailor = new Sprite({
  // simple sailor on boat animation
  position: {
    x: 360,
    y: 322,
  },
  imgSrc: "./img/SAILOR.png",
  framemax: 3,
  scale: 1.5,
});

const ken = new Sprite({
  // sprite when ken wins
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/ken/kenWins.png",
});

const ryu = new Sprite({
  // sprite when ryu wins
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/ryu/ryuWins.png",
});

const player = new Fighter({
  //player character
  position: {
    x: 10,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  imgSrc: "./img/ken/kenIdle4.png",
  framemax: 4,
  scale: 1.6,
  offset: {
    x: 18,
    y: 100,
  },
  sprites: {
    idle: {
      imgSrc: "./img/ken/kenIdle4.png",
      framemax: 4,
    },
    run: {
      imgSrc: "./img/ken/kenRun5.png",
      framemax: 5,
    },
    jump: {
      imgSrc: "./img/ken/kenJump7.png",
      framemax: 7,
    },
    punch: {
      imgSrc: "./img/ken/kenPunch3.png",
      framemax: 3,
    },
    death: {
      imgSrc: "./img/fken/kenDeath5.png",
      framemax: 5,
    },

    //flip sprites for when the player flips position

    fidle: {
      imgSrc: "./img/fken/kenIdle4.png",
      framemax: 4,
    },
    frun: {
      imgSrc: "./img/fken/kenRun5.png",
      framemax: 5,
    },
    fjump: {
      imgSrc: "./img/fken/kenJump7.png",
      framemax: 7,
    },
    fpunch: {
      imgSrc: "./img/fken/kenPunch3.png",
      framemax: 3,
    },
    fdeath: {
      imgSrc: "./img/fken/kenDeath5.png",
      framemax: 5,
    },
  },
});

player.lastkey = "d"; // makes player spawn and turn

const enemy = new Fighter({
  //enemy character
  position: {
    x: 920,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  imgSrc: "./img/ryu/ryuIdle4.png",
  framemax: 4,
  scale: 1.6,
  offset: {
    x: 20,
    y: 100,
  },
  sprites: {
    idle: {
      imgSrc: "./img/ryu/ryuIdle4.png",
      framemax: 4,
    },
    run: {
      imgSrc: "./img/ryu/ryuRun5.png",
      framemax: 5,
    },
    jump: {
      imgSrc: "./img/ryu/ryuJump7.png",
      framemax: 7,
    },
    punch: {
      imgSrc: "./img/ryu/ryuPunch3.png",
      framemax: 3,
    },
    death: {
      imgSrc: "./img/ryu/ryuIdle4.png",
      framemax: 1,
    },

    //flip sprites for when the player flips position

    fidle: {
      imgSrc: "./img/fryu/ryuIdle4.png",
      framemax: 4,
    },
    frun: {
      imgSrc: "./img/fryu/ryuRun5.png",
      framemax: 5,
    },
    fjump: {
      imgSrc: "./img/fryu/ryuJump7.png",
      framemax: 7,
    },
    fpunch: {
      imgSrc: "./img/fryu/ryuPunch3.png",
      framemax: 3,
    },
    fdeath: {
      imgSrc: "./img/fryu/ryuIdle4.png",
      framemax: 1,
    },
  },
});

const keys = {
  //constant that contains the if current key is pressed
  a: { pressed: false },
  d: { pressed: false },
  arrowLeft: { pressed: false },
  arrowRight: { pressed: false },
};

counter();

function animate() {
  //animation loop
  if (!enemy.isDead && !player.isDead) {
    {
      window.requestAnimationFrame(animate);
    }
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    flag.update();
    men.update();
    women.update();
    sailor.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;
  }

  if (!player.isDead) {
    // player movement
    if (keys.d.pressed && player.lastkey === "d") {
      player.velocity.x = 3;
      player.SwitchSprite("run");
    } else if (keys.a.pressed && player.lastkey === "a") {
      player.velocity.x = -3;
      player.SwitchSprite("frun");
    } else {
      if (player.lastkey === "d") {
        player.SwitchSprite("idle");
      } else {
        player.SwitchSprite("fidle");
      }
    }
  }

  if (player.velocity.y < 0) {
    // jump sprite change
    if (player.lastkey === "d") player.SwitchSprite("jump");
    else {
      player.SwitchSprite("fjump");
    }
  }

  if (!enemy.isDead) {
    // enemy movement
    if (keys.arrowRight.pressed && enemy.lastkey === "arrowRight") {
      enemy.velocity.x = 3;
      enemy.SwitchSprite("frun");
    } else if (keys.arrowLeft.pressed && enemy.lastkey === "arrowLeft") {
      enemy.velocity.x = -3;
      enemy.SwitchSprite("run");
    } else {
      if (enemy.lastkey === "arrowRight") {
        enemy.SwitchSprite("fidle");
      } else {
        enemy.SwitchSprite("idle");
      }
    }
  }

  if (enemy.velocity.y < 0) {
    // jump sprite change
    if (enemy.lastkey === "arrowLeft") enemy.SwitchSprite("jump");
    else {
      enemy.SwitchSprite("fjump");
    }
  }

  if (RectangularCollision({ rectangal1: player, rectangal2: enemy })) {
    // detect collision if player hits enemy
    console.log("player hit enemy");
    enemy.health -= 1;
    document.querySelector("#bar-enemy").style.width = enemy.health + "%";

    console.log(enemy.health);
  }

  if (RectangularCollision({ rectangal1: enemy, rectangal2: player })) {
    // detect collision if enemy hits player
    console.log("enemy hit player");
    player.health -= 1;
    document.querySelector("#bar-player").style.width = player.health + "%";
    console.log(player.health);
  }

  if (player.health <= 0 || enemy.health <= 0 || timeleft <= 0) {
    // checks if anyone died
    Winner(player, enemy, downloadTimer);
  } else {
    player.update();
    enemy.update();
  }
}

animate();

window.addEventListener("keydown", (event) => {
  //user controls
  if (!player.isDead) {
    switch (event.code) {
      case "KeyD":
        keys.d.pressed = true;
        player.lastkey = "d";
        break;

      case "KeyA":
        keys.a.pressed = true;
        player.lastkey = "a";
        break;

      case "KeyW":
        if (player.position.y > 0) {
          player.velocity.y = -10;
        }
        break;

      case "Space":
        player.Attacking();
        if (player.lastkey === "d") {
          player.SwitchSprite("punch");
        } else {
          player.SwitchSprite("fpunch");
        }
        break;
    }
  }

  if (!enemy.isDead) {
    switch (event.key) {
      case "ArrowRight":
        keys.arrowRight.pressed = true;
        enemy.lastkey = "arrowRight";
        break;

      case "ArrowLeft":
        keys.arrowLeft.pressed = true;
        enemy.lastkey = "arrowLeft";
        break;

      case "ArrowUp":
        if (enemy.position.y > 0) {
          enemy.velocity.y = -10;
        }
        break;

      case "ArrowDown":
        enemy.Attacking();
        if (enemy.lastkey === "arrowLeft") {
          enemy.SwitchSprite("punch");
        } else {
          enemy.SwitchSprite("fpunch");
        }
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyD":
      keys.d.pressed = false;
      break;

    case "KeyA":
      keys.a.pressed = false;
      break;

    case "KeyW":
      break;
  }
  switch (event.key) {
    case "ArrowRight":
      keys.arrowRight.pressed = false;
      break;

    case "ArrowLeft":
      keys.arrowLeft.pressed = false;
      break;

    case "ArrowUp":
      break;
  }
});
