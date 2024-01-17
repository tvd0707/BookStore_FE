class ImageModel {
    imageId: number;
    imageName?: string;
    isThumbnail?: boolean;
    urlImage?: string;
    dataImage?: string;

    constructor(
        imageId: number,
        imageName?: string,
        isThumbnail?: boolean,
        urlImage?: string,
        dataImage?: string,
    ) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.isThumbnail = isThumbnail;
        this.urlImage = urlImage;
        this.dataImage = dataImage;
    }
}

export default ImageModel;