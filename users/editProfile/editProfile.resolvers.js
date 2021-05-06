import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default 
{
    Mutation:
    {
        editProfile: async (
        _,
        { 
            firstName, 
            lastName, 
            username, 
            email, 
            password: newPassword
        }, { loggedInUser }) => 
            {
                console.log(loggedInUser );
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const { id } = await client.user.update({
                    where: {
                        id:loggedInUser.id
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        ...(uglyPassword && { password: uglyPassword }),
                    },
                });
                if (loggedInUser.id) {
                    return {
                    ok: true,
                    };
                } else {
                    return {
                    ok: false,
                    error: "Could not update profile.",
                };
            }
        },
    },
};