const roles = ["user", "asmin"];

//* User Authorization
const roleRights = new Map();

//! Defining rights for each role
//? User role with no specific rights
roleRights.set(roles[0], []);
//? Admin role with specific rights
roleRights.set(roles[1], ["getUsers", "manageUsers", "manageRoles"]);

module.exports = {
	roles,
	roleRights,
};
