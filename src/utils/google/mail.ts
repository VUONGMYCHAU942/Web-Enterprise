
class Gmail {
    private CLIENT_ID = process.env.CLIENT_ID!
    private CLIENT_SECRET = process.env.CLIENT_SECRET!
    private REDIRECT_URI = process.env.REDIRECT_URI!
    private REFRESH_TOKEN = process.env.REFRESH_DRIVE_TOKEN!
    private oauth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI)
    private drive!: drive_v3.Drive

    private async getAccessTokenGmail = ()  {
        try {
            const oauth2Client = new google.auth.OAuth2(this.clientId, this.clientSecret, this.redirectUrl);
            oauth2Client.setCredentials({ refresh_token: this.refreshToken });
            const accessToken = await oauth2Client.getAccessToken();
            return accessToken;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Gmail