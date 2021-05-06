import bcrypt from "bcrypt";
import client from "../client";
import jwt from "jsonwebtoken";
export default {
  Mutation: {
    createAccount: async (_, { 
        firstName, 
        lastName,
        userName, 
        email,
        password
    }) => 
        {
            try {

                //check if username or email are already on DB. 
                const existingUser = await client.user.findFirst({
                    where:{ 
                        OR: [
                            {
                                userName, 
                            }, 
                            {
                                email,
                            }
                        ],
                    },
                });
                if (existingUser) {
                    throw new Error("This username/password is already taken.");
                }
                // hash password
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        userName, 
                        email, 
                        firstName, 
                        lastName, 
                        password: uglyPassword,
                    },
                });
            } catch(e) {
                return e;
            }
            
        },
        // login
        login : async (_ ,{userName, password}) => 
        {
            // find user with args.username
            const user = await client.user.findFirst({where: {userName}});
            if (!user) {
                return {
                    ok: false,
                    error: "user not found"
                };
            }
            // check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok:false,
                    error:"Incorrect password"
                };
            }
            // issue a token and send it to the user
            const token = await jwt.sign({id:user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        },
    },
};            