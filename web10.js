
/* wapi setup */
const ops = new Set(); //set of opponent usernames
const provider="api.web10.app"
const wapi = wapiInit("https://auth.web10.app", "rtc.web10.app");
authButton.onclick = wapi.openAuthPortal;

function initApp() {
    authButton.innerHTML = "log out";
    authButton.onclick = () => {
        wapi.signOut();
        window.location.reload();
    };
    const t = wapi.readToken();
    message.innerHTML = `hello ${t["provider"]}/${t["username"]},<br>`;
    versus.style.display = "block";
    wapi.initP2P(loadOpposition, "fps-game-device")
}

if (wapi.isSignedIn()) initApp();
else wapi.authListen(initApp);

function loadOpposition(conn,data) {
    console.log(data)
    data["spheres"].map((opS,idx)=>{
        var s = spheres[10+idx]
        s.collider.center.x = opS.x
        s.collider.center.y = opS.y
        s.collider.center.z = opS.z
        s.velocity.x = opS.vX
        s.velocity.y = opS.vY
        s.velocity.z = opS.vZ
        s.mesh.material.color = opS.color
    })
}

function addOp(opponentUsername){
    ops.add(opponentUsername);
    var lobby=""
    ops.forEach((op)=>{lobby+=`${op}<br>`});
    lobbyDiv.innerHTML=lobby;
}

//called on every frame to send physics data to other players
function sendState(spheres, playerVelocity, playerCollider) {
    const spheresData = spheres.slice(0,spheresPerPlayer).map((sphere, idx) => {
        return {
            idx: idx,
            x: sphere.collider.center.x,
            y: sphere.collider.center.y,
            z: sphere.collider.center.z,
            vX: sphere.velocity.x,
            vY: sphere.velocity.y,
            vZ: sphere.velocity.z,
            color: sphere.mesh.material.color
        }
    })
    const player = {
        x: playerCollider.x,
        y: playerCollider.y,
        z: playerCollider.z,
        vX: playerVelocity.x,
        vY: playerVelocity.y,
        vZ: playerVelocity.z,
        color: "red"
    }
    const data =             {
        spheres: spheresData,
        player: player
    }
    ops.forEach((op) => {
        wapi.send(
            provider,
            op,
            window.location.hostname,
            "fps-game-device",
            data
            )
    })
}
