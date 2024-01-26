import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  PutObjectCommand,
  S3Client,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

export enum FileType {
  POSTERS = 'posters',
  SLIDES = 'slides',
  AVATARS = 'avatars',
}

@Injectable()
export class FilesService {
  private readonly s3Client = new S3Client({
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });
  private readonly bucketName = this.configService.get('AWS_BUCKET_NAME');
  private readonly awsHost = this.configService.get('AWS_HOST');

  constructor(private configService: ConfigService) {}

  // upload file to S3 bucket in specific folder
  async uploadFile(type: FileType, file: Express.Multer.File): Promise<string> {
    const fileName = this.generateUniqueFileName(file.originalname);
    const filePath = type + '/' + fileName;

    await this.createFolderIfNotExist(this.bucketName, type + '/');

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filePath,
      Body: file.buffer,
    });

    await this.s3Client.send(command);

    return this.awsHost + filePath;
  }

  // check folder exist in S3 bucket
  private async isFolderExist(Bucket: string, Key: string): Promise<boolean> {
    const command = new HeadObjectCommand({ Bucket, Key });

    try {
      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  // create new folder in S3 bucket
  private async createFolder(Bucket: string, Key: string): Promise<void> {
    const command = new PutObjectCommand({ Bucket, Key });
    await this.s3Client.send(command);
  }

  // create new folder in S3 bucket if its not exist
  private async createFolderIfNotExist(
    Bucket: string,
    Key: string,
  ): Promise<void> {
    const isFolderExist = await this.isFolderExist(Bucket, Key);
    if (!isFolderExist) {
      await this.createFolder(Bucket, Key);
    }
  }

  // get extension from original file and generate new file name with uuid
  private generateUniqueFileName(originalName: string): string {
    const fileName = uuidv4();
    const fileExtension = originalName.split('.').pop();
    return fileName + '.' + fileExtension;
  }

  // remove file from S3 bucket
  async removeFile(fullFilePath: string): Promise<void> {
    // get Key from file link
    const Key = fullFilePath.split('/').splice(-2).join('/'); // poster/filename.png
    console.log(Key);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key,
    });
    await this.s3Client.send(command);
  }
}
