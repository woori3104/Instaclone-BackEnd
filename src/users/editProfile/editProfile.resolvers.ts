import * as fs from "fs";
import * as bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFn = async (
    _,
    { firstName, lastName, userName, email, password: newPassword, bio, avatar },
    { loggedInUser, client }) => {
    let avatarUrl = null;
    if (avatar) {
        avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
        /*
        const { filename, createReadStream } = await avatarURL;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + newFilename);       

        readStream.pipe(writeStream);
        avatar = `http://locahost:4000//static/${newFilename}`;
        */
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
            userName,
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
const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    },
};
export default resolvers;