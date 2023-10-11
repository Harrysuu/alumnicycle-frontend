class User {
  constructor(id, username, password, credit, college, statusInformation, description, email, createTime, editTime, picture) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.credit = credit;
    this.college = college;
    this.statusInformation = statusInformation;
    this.description = description;
    this.email = email;
    this.createTime = createTime;
    this.editTime = editTime;
    this.picture = picture;
  }
}

export default User;