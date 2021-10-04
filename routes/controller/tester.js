regex = /[^a-zA-Z]/


let str = "lkahsdjflajsfljkals345345234kjdf"
regex.test(str)

if (regex.test(str) === true) {
    console.log("Line XXX - funvar -", str, "sucessful find")
} else {
    console.log("all leters hjere")
}