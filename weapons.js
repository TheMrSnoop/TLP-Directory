import { LoadModel } from "/model.js";

function clearModelChildren()
{
    let containerChildren = document.getElementById("WeaponModel").childNodes;

    containerChildren.forEach(element => {
        element.remove();
    });
}

function ReturnIsMobile()
{
    const baseHeight = window.innerHeight;
    const baseWidth = window.innerWidth;

    let ratio = (Math.round((baseWidth / baseHeight) * 100)) / 100;

    return(ratio < 0.85);
}

function ReturnStatType(index)
{
    switch (index) {
        case 0:
            return("Damage: ")
        case 1:
            return("Range: ")
        case 2:
            return("Recoil: ")
        case 3:
            return("DPS: ");
        default:
            break;
    }
}

function clearProgressBar()
{
    let all_Square_Filled = Array.from(document.getElementsByClassName("Square_Filled"));
    let all_Square_Empty = Array.from(document.getElementsByClassName("Square_Empty"));

    //Removes the filled squares first
    all_Square_Filled.forEach(element => {
        element.remove();
    });

    //Then, removes the empty ones
    all_Square_Empty.forEach(element => {
        element.remove();
    });
}

function FillProgressBar(ProgressBarIndex, statValue, statMax)
{
    let allProgressBars = Array.from(document.getElementsByClassName("ProgressBar"));
    let allStatHeaders = Array.from(document.getElementsByClassName("StatHeader"));

    let targetProgressBar = allProgressBars[ProgressBarIndex];
    let fillIndex = Math.round((statValue / statMax) * 10)

    let StatPrefix = ReturnStatType(ProgressBarIndex);

    allStatHeaders[ProgressBarIndex].innerHTML = `${StatPrefix} ${statValue}`;

    for (let index = 0; index < 10; index++) {
        if (index < fillIndex) {
            let newDiv = document.createElement("div");

            newDiv.className = "Square_Filled";

            targetProgressBar.appendChild(newDiv);

        }
        else {
            let newDiv = document.createElement("div");

            newDiv.className = "Square_Empty";

            targetProgressBar.appendChild(newDiv);
        }
    }
}

function LoadText(Name, Description)
{
    let Title = document.getElementById("WeaponName")
    let Desc = document.getElementById("Desc")

    Title.innerHTML = Name;
    Desc.innerHTML = Description;

    document.title = Name;
}

function LoadImages(ManufactureID, WeaponIconPath)
{
    let WeaponsImage = document.getElementById("WeaponIcon")
    WeaponsImage.src = WeaponIconPath;
    
    let ManufactureIcon = document.getElementById("CountryIcon")

    switch (ManufactureID) {
        case "Soviet":
            ManufactureIcon.src = "Images/Hammer_and_Sickle_and_Star.svg.png";
            break;
        case "American":
            ManufactureIcon.src = "Images/SpaceForce.png";  
            break;
        default:
            break;
    }
}

function LoadMobileVersion()
{
    let currentUrl = new URL(window.location.href);
    let currentPath = currentUrl.pathname;
    let fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    //If aspect ratio IS mobile, and mobile.html is not already loaded, load mobile.html
    if (ReturnIsMobile() && fileName != "mobile.html")
    {
        let redirectFile = "mobile.html";
        window.location.href = redirectFile;
    }
    else if (!ReturnIsMobile() && fileName == "mobile.html")
    {
        let redirectFile = "rifles.html";
        window.location.href = redirectFile;
    }
}


function Load(WeaponIndex)
{
    clearProgressBar();
    const Weapons =
        [
            {
                Name: "SOVIET AK-72",
                Description: "First manufactured by the Union of Soviet Socialist Republics in 2014, it first served as the Red Army's default rifle. After realizing its potential, it was given to Cosmosoldiers, and the AK-72u varrient, is now the main weapon used in the Last War.",
                ImagePath: "Images/Weapon Icons/AK-72.png",
                ModelPath: "",
                CameraX: 15,
                CameraZ: -3,
                Manufacture: "Soviet",
                Damage: 125,
                Range: 2500,
                Recoil: 40,
                DPS: 10
            },
            {
                Name: "SOVIET AK-47",
                Description: "The classic, old, reliable Soviet AK-47. This legendary rifle was used by the Soviet Union up until the creation of the the AK-72. AK-47s are still used by rebels on Earth.",
                ImagePath: "Images/Weapon Icons/",
                ModelPath: "Models/AK-47.glb",
                CameraX: 15,
                CameraZ: -3,
                Manufacture: "Soviet",
                Damage: 125,
                Range: 3150,
                Recoil: 45,
                DPS: 8
            },
            {
                Name: "AMERICAN AR-15",
                Description: "The civilian version of the United States M4 military rifle. It is strongly suggested to use American rifles talored for military combat instead of civilian weapons.",
                ImagePath: "",
                ModelPath: "Models/ar-15.glb",
                CameraX: 22,
                CameraZ: -6,
                Manufacture: "American",
                Damage: 100,
                Range: 2500,
                Recoil: 50,
                DPS: 12
            },
            {
                Name: "AMERICAN M28",
                Description: "The civilian version of the United States M4 military rifle. It is strongly suggested to use American rifles talored for military combat instead of civilian weapons.",
                ImagePath: "",
                ModelPath: "Models/ar-15.glb",
                CameraX: 22,
                CameraZ: -6,
                Manufacture: "American",
                Damage: 100,
                Range: 2500,
                Recoil: 50,
                DPS: 12
            },
            {
                Name: "Berretta M9",
                Description: "A pistol commonly given to US Space Force Guardians, as a basic sidearm.",
                ImagePath: "",
                ModelPath: "Models/M9.glb",
                CameraX: 5,
                CameraZ: -2,
                Manufacture: "American",
                Damage: 75,
                Range: 900,
                Recoil: 80,
                DPS: 4
            }
        ]

    let CurrentWeapon = Weapons[WeaponIndex];

    LoadText(CurrentWeapon.Name, CurrentWeapon.Description)
    LoadImages(CurrentWeapon.Manufacture, CurrentWeapon.ImagePath)

    //Damage
    FillProgressBar(0, Weapons[WeaponIndex].Damage, 500);
    //Range
    FillProgressBar(1, Weapons[WeaponIndex].Range, 5000);
    //Recoil
    FillProgressBar(2, Weapons[WeaponIndex].Recoil, 100);
    //DPS
    FillProgressBar(3, Weapons[WeaponIndex].DPS, 15);

    let WeaponModel = document.getElementById("WeaponModel")

    clearModelChildren();

    if (CurrentWeapon.ModelPath != "")
    {
        WeaponModel.style.visibility = "visible";
        LoadModel(CurrentWeapon.ModelPath, CurrentWeapon.CameraX, CurrentWeapon.CameraZ);
    }
    else
    {
        WeaponModel.style.visibility = "hidden";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // attach click listeners to all <a> with data-index
    document.querySelectorAll('a[data-index]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const i = parseInt(link.dataset.index);
            Load(i);
        });
    });

    LoadMobileVersion(); // also safe to call here
});
