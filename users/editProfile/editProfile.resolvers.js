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
            irstName, 
            lastName, 
            username, 
            email, 
            password: newPassword
        }, {token}) => 
            {
                
                const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const { id } = await client.user.update({
                    where: {
                        id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        ...(uglyPassword && { password: uglyPassword }),
                    },
                });
                if (updatedUser.id) {
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