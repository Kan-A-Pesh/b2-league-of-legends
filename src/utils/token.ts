import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secret";

export const generateToken = (userId: number): string => {
    return jwt.sign({ userId: userId.toString() }, SECRET_KEY, { expiresIn: "7d" });
};

export const validateToken = (token: string): number | null => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return parseInt((decoded as any).userId);
    } catch {
        return null;
    }
};
