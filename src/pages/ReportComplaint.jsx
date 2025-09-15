import React, { useState, useRef } from 'react';
import { Camera, MapPin, Upload, X, CheckCircle, AlertCircle, FileImage, Video } from 'lucide-react';
import axios from 'axios';

const ReportComplaint = () => {
  const [media, setMedia] = useState(null);
  const [mediaPath, setMediaPath] = useState("");
  const [formData, setFormData] = useState({
    location: { name: "", lat: "", lng: "" },
    mediaPath: "",
    reason: "",
    additionalInfo: "",
    reportedBy: "",
    timestamp: "",
    status: "inProgress",
    mediaType: "",
  });
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const reasons = [
    "Speeding/Racing",
    "Overloading of Passengers", 
    "Driving without seat belt/Helmet",
    "Illegal Overtaking",
    "Potholes in Roads",
    "Pavement Defects",
    "Others"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!media) newErrors.media = "Please upload an image or video";
    if (!formData.location.name) newErrors.location = "Please select your location";
    if (!formData.reason) newErrors.reason = "Please select a reason";
    if (!formData.additionalInfo.trim()) newErrors.additionalInfo = "Please provide additional information";
    if (!termsAccepted) newErrors.terms = "Please accept the terms and conditions";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleFileSelect = async (file) => {
  if (!file) return;

  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    setErrors({ ...errors, media: "File size must be less than 50MB" });
    return;
  }

  const allowedTypes = ["image/", "video/"];
  if (!allowedTypes.some((type) => file.type.startsWith(type))) {
    setErrors({ ...errors, media: "Please upload only images or videos" });
    return;
  }

  setLoaderVisible(true); // show loader while uploading

  try {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "fixMyCity_preset"); 
    formDataUpload.append("cloud_name", "dnkuwjegy");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dnkuwjegy/upload`,
      formDataUpload
    );

    const uploadedUrl = res.data.secure_url;

    setMedia(file);
    setMediaPath(uploadedUrl); // ✅ use Cloudinary URL, not local
    setFormData({
      ...formData,
      mediaType: file.type.split("/")[0],
      mediaPath: uploadedUrl, // ✅ store it in formData
    });
    setErrors({ ...errors, media: null });
  } catch (err) {
    setErrors({ ...errors, media: "Failed to upload file. Try again." });
  } finally {
    setLoaderVisible(false);
  }
};


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const getLocation = async () => {
    setLoaderVisible(true);
    try {
      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by this browser");
      }
      
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
      
      const { latitude, longitude } = position.coords;
      const locationName = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      
      setFormData({
        ...formData,
        location: {
          name: locationName,
          lat: latitude.toString(),
          lng: longitude.toString()
        }
      });
      setErrors({...errors, location: null});
      
    } catch (error) {
      setErrors({...errors, location: "Unable to get location. Please try again."});
    } finally {
      setLoaderVisible(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoaderVisible(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setMedia(null);
        setMediaPath("");
        setFormData({
          location: { name: "", lat: "", lng: "" },
          mediaPath: "",
          reason: "",
          additionalInfo: "",
          reportedBy: "",
          timestamp: "",
          status: "inProgress",
          mediaType: "",
        });
        setTermsAccepted(false);
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      setErrors({submit: "Failed to submit complaint. Please try again."});
    } finally {
      setLoaderVisible(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen  bg-[#dff2f7] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md mx-auto animate-pulse">
          <div className="animate-bounce mb-6">
            <CheckCircle className="mx-auto text-green-500" size={64} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Your complaint has been submitted successfully. We'll review it and take appropriate action.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="bg-green-500 h-2 rounded-full animate-pulse w-full"></div>
          </div>
          <p className="text-sm text-gray-500">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#dff2f7]  py-8 px-4">
      {/* Loading Overlay */}
      {loaderVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-700 font-medium">Wait Adding...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl pt-10 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Report a Complaint
          </h1>
          <p className="text-gray-600 text-lg">Help us make our community safer by reporting incidents</p>
        </div>

        <div className="space-y-8">
          {/* Media Upload Section */}
          <div className="bg-[#f0f6fa] rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="p-2 bg-blue-100 rounded-xl mr-3">
                <Camera className="text-blue-600" size={28} />
              </div>
              Upload Evidence
            </h2>
            
            {!media ? (
              <div
                className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
                  ${dragActive 
                    ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-lg' 
                    : errors.media 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:transform hover:scale-105'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
                <Upload className={`mx-auto mb-4 transition-all duration-300 ${dragActive ? 'text-blue-500 animate-bounce' : 'text-gray-400'}`} size={48} />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Drag & drop your file here
                </h3>
                <p className="text-gray-500 mb-4">or click to browse</p>
                <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-4">
                  <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <FileImage className="mr-1" size={16} />
                    Images
                  </span>
                  <span className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                    <Video className="mr-1" size={16} />
                    Videos
                  </span>
                </div>
                <p className="text-xs text-gray-400">Max file size: 50MB</p>
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => {
                    setMedia(null);
                    setMediaPath("");
                    setFormData({...formData, mediaType: ""});
                  }}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300 z-10 hover:scale-110 shadow-lg"
                >
                  <X size={16} />
                </button>
                
                {formData.mediaType === "image" ? (
                  <img
                    src={mediaPath}
                    alt="Uploaded evidence"
                    className="w-full h-64 object-contain rounded-xl shadow-lg"
                  />
                ) : (
                  <video
                    controls
                    src={mediaPath}
                    className="w-full h-64 object-contain rounded-xl shadow-lg"
                  />
                )}
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Change File
                </button>
              </div>
            )}
            {errors.media && (
              <p className="mt-3 text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.media}
              </p>
            )}
          </div>

          {/* Location Section */}
          <div className="bg-[#f0f6fa] rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="p-2 bg-green-100 rounded-xl mr-3">
                <MapPin className="text-green-600" size={28} />
              </div>
              Location
            </h2>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                value={formData.location.name}
                readOnly
                placeholder="Click 'Get Location' to auto-detect your current location"
                className={`flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none bg-gray-50 transition-all duration-300
                  ${errors.location ? 'border-red-300' : 'border-gray-200 focus:border-blue-500'}`}
              />
              <button
                type="button"
                onClick={getLocation}
                disabled={loaderVisible}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MapPin className="mr-2" size={20} />
                Get Location
              </button>
            </div>
            {errors.location && (
              <p className="mt-3 text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.location}
              </p>
            )}
          </div>

          {/* Reason Section */}
          <div className="bg-[#f0f6fa] rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="p-2 bg-purple-100 rounded-xl mr-3">
                <AlertCircle className="text-purple-600" size={28} />
              </div>
              Reason for Complaint
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105
                    ${formData.reason === reason 
                      ? 'border-purple-500 bg-purple-50 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                >
                  <input
                    type="radio"
                    value={reason}
                    checked={formData.reason === reason}
                    onChange={(e) => {
                      setFormData({...formData, reason: e.target.value});
                      setErrors({...errors, reason: null});
                    }}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300
                    ${formData.reason === reason ? 'border-purple-500 shadow-lg' : 'border-gray-300'}`}>
                    {formData.reason === reason && (
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{reason}</span>
                </label>
              ))}
            </div>
            {errors.reason && (
              <p className="mt-3 text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.reason}
              </p>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-[#f0f6fa] rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="p-2 bg-orange-100 rounded-xl mr-3">
                <FileImage className="text-orange-600" size={28} />
              </div>
              Additional Information
            </h2>
            
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => {
                setFormData({...formData, additionalInfo: e.target.value});
                setErrors({...errors, additionalInfo: null});
              }}
              placeholder="Please provide detailed information about the incident, including time, circumstances, and any other relevant details..."
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none transition-all duration-300 shadow-inner
                ${errors.additionalInfo ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-orange-500 focus:shadow-lg'}`}
            />
            <div className="mt-2 text-right">
              <span className={`text-sm ${formData.additionalInfo.length > 10 ? 'text-green-500' : 'text-gray-400'}`}>
                {formData.additionalInfo.length} characters
              </span>
            </div>
            {errors.additionalInfo && (
              <p className="mt-3 text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.additionalInfo}
              </p>
            )}
          </div>

          {/* Terms and Submit */}
          <div className="bg-[#f0f6fa] rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
            <label className={`flex items-start space-x-3 cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg
              ${errors.terms ? 'border-red-300 bg-red-50' : termsAccepted ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setErrors({...errors, terms: null});
                }}
                className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500 transition-all duration-300"
              />
              <div className="flex-1">
                <p className="text-gray-700 leading-relaxed">
                  I understand that reporting fake complaints against anyone will lead to legal actions against me. I confirm that all information provided is accurate and truthful.
                </p>
              </div>
            </label>
            {errors.terms && (
              <p className="mt-3 text-red-500 text-sm flex items-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.terms}
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loaderVisible}
              className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 disabled:opacity-50 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {loaderVisible ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Complaint...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  Submit Complaint
                </>
              )}
            </button>

            {errors.submit && (
              <p className="mt-4 text-red-500 text-sm flex items-center justify-center bg-red-50 p-3 rounded-xl">
                <AlertCircle size={16} className="mr-2" />
                {errors.submit}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComplaint;
