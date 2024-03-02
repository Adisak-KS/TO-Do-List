const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        // Sweetalert2 เมื่อไม่ได้กรอกข้อมูล
        showRequired();
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Sweetalert2 เพิ่มข้อมูลสำเร็จ
        addSuccess();
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        confirmDelete().then((result) => {
            if (result.isConfirmed) {
                e.target.parentElement.remove();
                saveData();
                deleteSuccess()
            }
        });
    }
}, false);


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// แสดงเมื่อไม่ได้กรอกข้อมูล
function showRequired() {
    Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณากรอกข้อมูล!",
    });
}

// แสดงเมื่อเพิ่มข้อมูลสำเร็จ
function addSuccess() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "เพิ่มข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1000
    });
}

// ย
function confirmDelete() {
    return Swal.fire({
        title: "คำเตือน",
        text: "คุณต้องการลบข้อมูลใช่ไหม?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dd3333",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonColor: "#6e7881",
        cancelButtonText: "ยกเลิก",
    });
}

function deleteSuccess() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        showConfirmButton: false,
        timer: 1000
    });

}

