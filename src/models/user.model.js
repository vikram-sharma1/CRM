const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name:{ type: String, required: true},
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact : { type: Number, required: true},
    nameofbusiness:{ type: String, required: true},
    userId: { type: String, required: true},
    pic:[{type:String, required: true}],
    
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
  
    // secret , salt => sdkfhsdkfh , secret + sdkfhsdkfh => dskfgkcskdfgsdkfsdf
    // salt
    // hashing rounds =>
    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
  });
  
  userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  const User = mongoose.model("user", userSchema); // user => users
  
  module.exports = User;