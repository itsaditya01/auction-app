exports.fileValidation = (req, res, next) => {
  const file = req.file;
  console.log(req.file);
  // Array of allowed files
  const array_of_allowed_files = ["png", "jpeg", "jpg", "gif", "mp4"];
  const array_of_allowed_file_types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "video/mp4",
  ];
  // Allowed file size in mb
  const allowed_image_size = 2;
  const allowed_video_size = 30;
  // Get the extension of the uploaded file
  const file_extension = file.originalname.slice(
    ((file.originalname.lastIndexOf(".") - 1) >>> 0) + 2
  );
  console.log(file_extension);
  // Check if the uploaded file is allowed
  if (
    !array_of_allowed_files.includes(file_extension) ||
    !array_of_allowed_file_types.includes(file.mimetype)
  ) {
    const error = Error("Invalid file type.");
    error.code = 403;
    next(error);
  }
  console.log(file.size / (1024 * 1024));
  if (
    (file_extension === "mp4" || file.mimetype === "video/mp4") &&
    file.size / (1024 * 1024) > allowed_video_size
  ) {
    const error = Error("Video should be less than 30 MB in size");
    error.code = 403;
    next(error);
  } else if (
    !(file_extension === "mp4" || file.mimetype === "video/mp4") &&
    file.size / (1024 * 1024) > allowed_image_size
  ) {
    const error = Error("Image should be less than 2 MB in size");
    error.code = 403;
    next(error);
  }
  return next();
};
