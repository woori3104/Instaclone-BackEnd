import fs from "fs";
import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";


const resolverFn = async (
    _,
    { firstName, lastName, username, email, password: newPassword, bio, avatar },
    { loggedInUser }) => {
    let avatarUrl = null;
    if (avatar) {
        const { filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + newFileName);
        readStream.pipe(writeStream);
        avatarUrl = `http://locahost:4000//static/${newFileName}`;
    }

    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
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
};
export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    },
};