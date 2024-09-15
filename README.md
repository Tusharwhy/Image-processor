# Image Resizing Tool

## Overview

This document outlines the development and functionality of the image resizing tool. It includes details about the initial setup, the initial approach, and the finalized approach to handling image uploads and processing.



## Initial Approach
![IMG_20240916_023921](https://github.com/user-attachments/assets/9b5c5cda-f60b-4ae1-9d56-9775471b836c)


### Workflow

1. **Image Upload**:
   - Users upload images through the frontend UI.
   - The image is sent to the backend server.

2. **Temporary Storage**:
   - The backend temporarily stores the uploaded image using multer.
   - The server waits for additional parameters from the user for image processing.

3. **Image Processing**:
   - The backend processes the image based on the parameters provided.
   - The processed image is then returned to the user.

Intial preview:

![Screenshot (96)](https://github.com/user-attachments/assets/2af0aaec-c442-455f-9c11-351fc19cb993)


### Limitations

- **Performance**: 
  - The tool performs well for moderate image sizes like in kb's.
  - However, performance decreases with larger, heavier images, causing delays in processing.

## Final Approach


![IMG_20240916_024147](https://github.com/user-attachments/assets/80a61387-5615-4efc-93d9-6af4c30fa357)

### Improved Workflow

1. **Initial Resize**:
   - Upon image upload, resizing the image to a lower resolution before sending it to the backend.
   - This reduces the load and speeds up initial processing.

2. **Backend Processing**:
   - The resized image is sent to the backend for processing with the user-defined parameters.
   - Backend then process the image with recieved parameters.

3. **Final Processing**:
   - Once the user is satisfied with the processed image, the original high-resolution image is sent to the backend.
   - The backend processes the original image with the same parameters.
   - The final output is then returned to the user.

Final preview:

![Screenshot (97)](https://github.com/user-attachments/assets/663e9bc6-00d6-4b75-9a44-0cf3f070646b)

### Benefits

- **Improved Performance**: 
  - Reducing the image size before processing helps in handling large images more efficiently.
  - Overall processing time is decreased, and user experience is enhanced.

## Conclusion

The image resizing tool has evolved from a basic image upload and processing system to a more efficient solution with improved performance for handling larger images. By resizing the image before processing, the tool ensures faster response times and a better user experience.



