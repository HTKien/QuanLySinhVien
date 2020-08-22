function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}
document.getElementById('btn-edit').style.display = 'none';



// localStorage.setItem('student', 'Hàn Trung Kiên');




function save() {
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    let gender = '';

    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
    } else if (document.getElementById("famale").checked) {
        gender = document.getElementById("famale").value;
    }
    if (_.isEmpty(fullname)) {
        document.getElementById("fullname-error").innerHTML = "Vui lòng nhập họ và tên!";
        fullname = "";

    } else if (fullname.trim().length <= 2) {
        document.getElementById("fullname-error").innerHTML = "Họ và tên không được nhỏ hơn 2 kí tự!";
        fullname = "";


    } else if (fullname.trim().length > 50) {
        document.getElementById("fullname-error").innerHTML = "Họ và tên không được lớn hơn 50 kí tự!";
        fullname = "";


    } else {
        document.getElementById("fullname-error").innerHTML = "";

    }

    if (_.isEmpty(email)) {
        document.getElementById("email-error").innerHTML = "Vui lòng nhập địa chỉ email!"
        email = "";

    } else if (!emailIsValid(email)) {
        document.getElementById("email-error").innerHTML = "Email không đúng định dạng!";
        email = "";


    } else {
        document.getElementById("email-error").innerHTML = "";

    }
    if (_.isEmpty(phone)) {
        document.getElementById("phone-error").innerHTML = "Vui lòng nhập số điện thoại!"
        phone = "";

    } else if (phone.trim().length > 10) {
        document.getElementById("phone-error").innerHTML = "Số điện thoại không được quá 10 kí tự!"
        phone = "";



    } else {
        document.getElementById("phone-error").innerHTML = "";

    }

    if (_.isEmpty(address)) {
        document.getElementById("address-error").innerHTML = "Vui lòng nhập địa chỉ!"
        address = "";

    } else {
        document.getElementById("address-error").innerHTML = "";

    }
    if (_.isEmpty(gender)) {
        document.getElementById("gender-error").innerHTML = "Vui lòng chọn giới tính!"
        gender = "";

    } else {
        document.getElementById("gender-error").innerHTML = "";

    }

    if (fullname && email && address && phone && gender) {
        // Lưu thông tin sinh viên lại 

        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            gender: gender,
            address: address

        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudents();










    }



}

function renderListStudents() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    console.log(students.length);
    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';

        return false
    }


    document.getElementById('list-student').style.display = 'block';

    let tableContent = `<tr>
    <td>Số TT</td>
    <td>Họ và tên </td>
    <td>Email </td>
    <td>Điện thoại </td>
    <td>Địa chỉ </td>
    <td>Giới tính </td>
    <td>Hành động </td>
</tr>`;
    students.forEach((student, index) => {
        let studentId = index;

        index++;
        let labelGender = parseInt(student.gender) === 1 ? 'Nam' : 'Nữ';



        tableContent += `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone} </td>
        <td>${student.address}</td>
        <td>${labelGender} </td>
        
        <td>
        <a onclick="editStudent(${studentId})" href='#'>Edit </a> | <a onclick="deleteStudent(${studentId})" href='#'>Delete </a>
        
        </td>
    </tr>`

    })
    document.getElementById('grid-view-students').innerHTML = tableContent;


}

function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);

    localStorage.setItem('students', JSON.stringify(students));
    renderListStudents();


}

function editStudent(id) {
    document.getElementById('btn-edit').style.display = 'block';

    document.getElementById('btn-add').style.display = 'none';

    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    document.getElementById('fullname').value = students[id].fullname;
    document.getElementById('email').value = students[id].email;
    document.getElementById('phone').value = students[id].phone;
    document.getElementById('address').value = students[id].address;
    document.getElementById('fullname').value = students[id].fullname;
    if (parseInt(students[id].gender) === 1) {
        document.getElementById('male').checked = 'checked';
    } else {
        document.getElementById('famale').checked = 'checked';
    }

}