import {google, drive_v3} from 'googleapis'

class GoogleDrive {
    private CLIENT_ID = process.env.CLIENT_ID!
    private CLIENT_SECRET = process.env.CLIENT_SECRET!
    private REDIRECT_URI = process.env.REDIRECT_URI!
    private REFRESH_TOKEN = process.env.REFRESH_DRIVE_TOKEN!
    private oauth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.REDIRECT_URI)
    private drive!: drive_v3.Drive

    constructor() {
        this.oauth2Client.setCredentials({ refresh_token: this.REFRESH_TOKEN });
        this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    }
    
    // Upload file to Google Drive
    public uploadFile = async(files: Buffer, type: string, folderId: string, fileName: string) => {
        try {
            const response =  await this.drive.files.create({
                media: {
                    mimeType: type,
                    body: files
                },
                requestBody: {
                    name: `${fileName}-${Date.now()}`,
                    mimeType: type,
                    parents: [folderId]
                },
                fields: 'id',

            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    // Remove file 
    public removeFile = async(fileId: string) => {
        try {
            const response = await this.drive.files.delete({
                fileId: fileId,
            });
            return response.data, response.status
        } catch (error) {
            console.log(error)
        }
    }

    // Get public link media
    public generatePublicUrl = async(fileId: string) => {
        try {
            await this.drive.permissions.create({
                fileId: fileId,
                requestBody: {
                  role: 'reader',
                  type: 'anyone',
                },
              });
    
              /* 
              * webViewLink: View the file in browser
              * webContentLink: Direct download link 
              */

              const result = await this.drive.files.get({
                fileId: fileId,
                fields: 'webViewLink, webContentLink',
              });
             return result.data
        } catch (error) {
            console.log(error)
        }
    }

    // Create a folder in Google Drive
    public createFolder = async(folderName: string) => {
        try {
            const response =  await this.drive.files.create({
                requestBody: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder'
                },
                fields: 'id',        
                   
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default new GoogleDrive



