const nodemailer = require('nodemailer');

/**
 * @typedef stmpOptions - SMTP 配置对象
 * @property {string} host - SMTP 服务器地址
 * @property {number} port - SMTP 服务器端口
 * @property {boolean} [secure=true] - 是否使用 SSL 加密
 * @property {string} user - SMTP 用户名
 * @property {string} pass - SMTP 密码/授权码
 * @property {string} from - SMTP 发件人邮箱
 * @property {string} to - SMTP 收件人邮箱
 * @property {string} subject - Email 主题
 * @property {string} text - Email 文本内容
 * @property {string} html - Email HTML 内容
 */

/**
 * @description 发送邮件
 * @param {stmpOptions} options - SMTP 配置
 * @returns {Promise<string>} Promise 实例，resolve 值为邮件发送结果
 */
const sendMail = ({ host, port, secure = true, user, pass, from, to, subject, text, html }) =>
    new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({ host, port, secure, "auth": { user, pass } })
        transporter.sendMail({ from, to, subject, text, html }, (/** @type {any} */ err, /** @type {{ response: string; }} */ info) => {
            if (err) reject(err);
            transporter.close();
            resolve("mail sent:" + info.response);
        });
    });

module.exports = {
    sendMail
};