"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

import completeBody from "../../assets/CompleteBody.png";
import Front from "../../assets/FrontImg.png";
import TrunkImg from "../../assets/TrunkImg.png";
import cabinImg from "../../assets/CabinImg.png";
import exteriorImg from "../../assets/ExteriorImg.png";

interface VehicleView {
  id: string;
  name: string;
  video: string;
  icon: string;
}

interface VehicleType {
  title: string;
  description: string;
  views: VehicleView[];
}

interface VehicleData {
  passenger: VehicleType;
  commercial: VehicleType;
}

type VehicleTypeKey = keyof VehicleData;

const LoadingSpinner: React.FC = () => (
  <div className="relative h-5 w-5">
    <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin"></div>
  </div>
);

const CircularProgress: React.FC<{ progress: number; size?: number }> = ({
  progress,
  size = 60,
}) => {
  const center = size / 2;
  const radius = center - 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        style={{ overflow: "visible" }}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.3s ease-out",
          }}
        />
      </svg>
    </div>
  );
};

const ViewIcon: React.FC<{
  type: string;
  isActive: boolean;
  vehicleType: VehicleTypeKey;
}> = ({ type, isActive, vehicleType }) => {
  const getIcon = () => {
    if (vehicleType === "commercial") {
      switch (type) {
        case "complete":
          return (
            <img
              src="/commercial-body.svg"
              alt="Complete Vehicle"
              className="w-15 h-15 object-contain"
            />
          );
        case "front":
          return (
            <img
              src="/commercial-engine.svg"
              alt="Engine"
              className="w-15 h-15 object-contain"
            />
          );
        case "cabin":
          return (
            <img
              src="/commercial-cabin.svg"
              alt="Cabin"
              className="w-15 h-15 object-contain"
            />
          );
        default:
          return (
            <img
              src="/commercial-body.svg"
              alt="Default"
              className="w-15 h-15 object-contain"
            />
          );
      }
    }

    switch (type) {
      case "complete":
        return (
          <img
            src={completeBody.src}
            alt="Complete"
            className="w-15 h-15 object-contain"
          />
        );
      case "front":
        return (
          <img
            src={Front.src}
            alt="Front"
            className="w-15 h-15 object-contain"
          />
        );
      case "cabin":
        return (
          <img
            src={cabinImg.src}
            alt="Cabin"
            className="w-15 h-15 object-contain"
          />
        );
      case "trunk":
        return (
          <img
            src={TrunkImg.src}
            alt="Trunk"
            className="w-15 h-15 object-contain"
          />
        );
      case "exterior":
        return (
          <img
            src={exteriorImg.src}
            alt="Exterior"
            className="w-15 h-15 object-contain"
          />
        );
      default:
        return (
          <img
            src={completeBody.src}
            alt="Default"
            className="w-15 h-15 object-contain"
          />
        );
    }
  };

  return (
    <div
      className={`w-24 h-15 flex items-center justify-center transition-all duration-300 rounded-lg ${
        isActive
          ? "text-white shadow-lg scale-110"
          : "bg-transparent text-gray-400"
      }`}
    >
      {getIcon()}
    </div>
  );
};

const vehicleData: VehicleData = {
  passenger: {
    title: "Passenger vehicles",
    description: "Revving up Nonwoven innovation from interior to exterior.",
    views: [
      {
        id: "complete",
        name: "Complete Body",
        video: "/videos/Passenger Alpha.mp4",
        icon: "complete",
      },
      {
        id: "front",
        name: "Front",
        video: "/videos/Front.mp4",
        icon: "front",
      },
      {
        id: "cabin",
        name: "Cabin",
        video: "/videos/Cabin.mp4",
        icon: "cabin",
      },
      {
        id: "trunk",
        name: "Trunk",
        video: "/videos/Trunk.mp4",
        icon: "trunk",
      },
      {
        id: "exterior",
        name: "Exterior",
        video: "/videos/Exterior.mp4",
        icon: "exterior",
      },
    ],
  },
  commercial: {
    title: "Commercial vehicles",
    description: "Advancing Nonwoven engineering for heavy-duty vehicles.",
    views: [
      {
        id: "complete",
        name: "Complete Vehicle",
        video: "/videos/Commercial Alpha.mp4",
        icon: "complete",
      },
      {
        id: "front",
        name: "Engine",
        video: "/videos/Commercial-Engine.mp4",
        icon: "front",
      },
      {
        id: "cabin",
        name: "Cabin",
        video: "/videos/Commercial-Cabin.mp4",
        icon: "cabin",
      },
    ],
  },
};

export default function EvolutionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeVehicleType, setActiveVehicleType] =
    useState<VehicleTypeKey>("passenger");
  const [activeView, setActiveView] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const currentVehicle = vehicleData[activeVehicleType];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRect.height;
      const containerTop = containerRect.top;
      const windowHeight = window.innerHeight;
      const startScroll = -containerTop;
      const endScroll = containerHeight - windowHeight;
      const currentScroll = Math.max(0, Math.min(endScroll, startScroll));
      const progress = endScroll > 0 ? currentScroll / endScroll : 0;

      setScrollProgress(progress);
      if (progress > 0.7) {
        if (activeVehicleType !== "commercial") {
          setActiveVehicleType("commercial");
          setActiveView(0);
        }
      } else if (progress > 0.2) {
        if (activeVehicleType !== "passenger") {
          setActiveVehicleType("passenger");
          setActiveView(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeVehicleType]);

  useEffect(() => {
    if (!isInView || !isAutoPlaying || currentVehicle.views.length <= 1) return;

    const interval = setInterval(() => {
      setActiveView((prev) => (prev + 1) % currentVehicle.views.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isAutoPlaying, activeVehicleType, currentVehicle.views.length]);

  useEffect(() => {
    const currentVideoKey = `${activeVehicleType}-${activeView}`;
    const currentVideo = videoRefs.current[currentVideoKey];

    if (currentVideo) {
      if (isVideoPlaying) {
        currentVideo.play().catch(console.error);
      } else {
        currentVideo.pause();
      }
    }

    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (key !== currentVideoKey && video) {
        video.pause();
      }
    });
  }, [activeVehicleType, activeView, isVideoPlaying]);

  useEffect(() => {
    const currentVideoKey = `${activeVehicleType}-${activeView}`;
    const currentVideo = videoRefs.current[currentVideoKey];

    if (currentVideo) {
      currentVideo.currentTime = 0;
      setVideoProgress(0);
      if (isVideoPlaying) {
        currentVideo.play().catch(console.error);
      }
    }
  }, [activeVehicleType, activeView]);

  const handlePlayPause = () => {
    const currentVideoKey = `${activeVehicleType}-${activeView}`;
    const currentVideo = videoRefs.current[currentVideoKey];

    if (currentVideo) {
      setIsVideoLoading(true);

      if (isVideoPlaying) {
        currentVideo.pause();
        setIsVideoPlaying(false);
        setIsAutoPlaying(false);
        setIsVideoLoading(false);
      } else {
        currentVideo
          .play()
          .then(() => {
            setIsVideoPlaying(true);
            setIsVideoLoading(false);
          })
          .catch((error) => {
            console.error("Error playing video:", error);
            setIsVideoLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    const currentVideoKey = `${activeVehicleType}-${activeView}`;
    const currentVideo = videoRefs.current[currentVideoKey];

    if (currentVideo) {
      const handlePlay = () => {
        setIsVideoPlaying(true);
        setIsVideoLoading(false);
      };
      const handlePause = () => {
        setIsVideoPlaying(false);
        setIsVideoLoading(false);
      };
      const handleLoadStart = () => setIsVideoLoading(true);
      const handleLoadedData = () => setIsVideoLoading(false);
      const handleWaiting = () => setIsVideoLoading(true);
      const handleCanPlay = () => setIsVideoLoading(false);
      const handleTimeUpdate = () => {
        if (currentVideo.duration && currentVideo.duration > 0) {
          const progress =
            (currentVideo.currentTime / currentVideo.duration) * 100;
          setVideoProgress(Math.min(100, Math.max(0, progress)));
        }
      };
      const handleLoadedMetadata = () => {
        if (currentVideo.duration && currentVideo.duration > 0) {
          const progress =
            (currentVideo.currentTime / currentVideo.duration) * 100;
          setVideoProgress(Math.min(100, Math.max(0, progress)));
        }
      };
      const handleEnded = () => {
        setVideoProgress(100);
      };

      currentVideo.addEventListener("play", handlePlay);
      currentVideo.addEventListener("pause", handlePause);
      currentVideo.addEventListener("loadstart", handleLoadStart);
      currentVideo.addEventListener("loadeddata", handleLoadedData);
      currentVideo.addEventListener("waiting", handleWaiting);
      currentVideo.addEventListener("canplay", handleCanPlay);
      currentVideo.addEventListener("timeupdate", handleTimeUpdate);
      currentVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
      currentVideo.addEventListener("ended", handleEnded);

      return () => {
        currentVideo.removeEventListener("play", handlePlay);
        currentVideo.removeEventListener("pause", handlePause);
        currentVideo.removeEventListener("loadstart", handleLoadStart);
        currentVideo.removeEventListener("loadeddata", handleLoadedData);
        currentVideo.removeEventListener("waiting", handleWaiting);
        currentVideo.removeEventListener("canplay", handleCanPlay);
        currentVideo.removeEventListener("timeupdate", handleTimeUpdate);
        currentVideo.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        currentVideo.removeEventListener("ended", handleEnded);
      };
    }

    // Return an empty cleanup function when currentVideo is not available
    return () => {};
  }, [activeVehicleType, activeView]);

  return (
    <div className="bg-black pb-[100px]">
      <div ref={containerRef} style={{ height: "300vh" }}>
        <section
          ref={sectionRef}
          className="bg-black text-white h-screen overflow-hidden sticky top-0 flex items-center justify-center"
        >
          <div className="w-full max-w-7xl mx-auto px-4 relative h-full">
            <motion.div
              className="absolute left-1/2"
              animate={{
                x: "-50%",
                y: scrollProgress < 0.15 ? "-50%" : "-50%",
                top: scrollProgress < 0.15 ? "50%" : "20%",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                width: "100%",
                textAlign: "center",
                zIndex: 10,
              }}
            >
              <h2 className="text-white font-light text-3xl md:text-4xl lg:text-3xl xl:text-5xl tracking-tight">
                <span className="leading-tight">
                  Evolving the drive with{" "}
                  <span className="font-bold">360-degree</span>{" "}
                  <br className="hidden md:block" /> nonwoven solutions
                </span>
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 h-full items-center"
              animate={{
                opacity: scrollProgress > 0.15 ? 1 : 0,
                y: scrollProgress > 0.15 ? 0 : 100,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                marginTop: scrollProgress > 0.15 ? "120px" : "0px",
              }}
            >
              <div className="flex flex-col justify-center pl-8 lg:pl-16 relative">
                <motion.button
                  type="button"
                  className="text-left mb-12 lg:mb-16"
                  onClick={() => {
                    setActiveVehicleType("passenger");
                    setActiveView(0);
                  }}
                  animate={{
                    opacity: activeVehicleType === "passenger" ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`font-medium text-left pb-2 text-2xl lg:text-3xl xl:text-4xl transition-colors duration-300 ${
                      activeVehicleType === "passenger"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    Passenger vehicles
                  </h3>
                  <p
                    className={`font-light text-left text-base lg:text-lg xl:text-xl transition-colors duration-300 ${
                      activeVehicleType === "passenger"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    Revving up innovation from <br /> interior to exterior.
                  </p>
                </motion.button>

                <motion.button
                  type="button"
                  className="text-left"
                  onClick={() => {
                    setActiveVehicleType("commercial");
                    setActiveView(0);
                  }}
                  animate={{
                    opacity: activeVehicleType === "commercial" ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    className={`font-medium text-left pb-2 text-2xl lg:text-3xl xl:text-4xl transition-colors duration-300 ${
                      activeVehicleType === "commercial"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    Commercial vehicles
                  </h3>
                  <p
                    className={`font-light text-left text-base lg:text-lg xl:text-xl transition-colors duration-300 ${
                      activeVehicleType === "commercial"
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    Advancing engineering <br /> for heavy-duty vehicles.
                  </p>
                </motion.button>

                <div className="absolute left-0 top-0 h-full w-[3px] bg-gray-600 rounded-md overflow-hidden">
                  <motion.div
                    className="absolute w-[3px] bg-white rounded-md"
                    animate={{
                      height: "50%",
                      top: activeVehicleType === "passenger" ? "0%" : "50%",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="relative flex flex-col items-center justify-center h-full">
                <div className="relative flex items-center justify-center w-full min-h-[400px] mb-8">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: activeVehicleType === "passenger" ? 1 : 0,
                      scale: activeVehicleType === "passenger" ? 1 : 0.8,
                      y: activeVehicleType === "passenger" ? 0 : 50,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {activeVehicleType === "passenger" && (
                      <motion.video
                        key={`passenger-${activeView}`}
                        ref={(el) => {
                          videoRefs.current[`passenger-${activeView}`] = el;
                        }}
                        className="max-w-full max-h-[400px] object-contain"
                        autoPlay={isVideoPlaying}
                        muted
                        loop
                        playsInline
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <source
                          src={currentVehicle.views[activeView]?.video}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </motion.video>
                    )}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: activeVehicleType === "commercial" ? 1 : 0,
                      scale: activeVehicleType === "commercial" ? 1 : 0.8,
                      y: activeVehicleType === "commercial" ? 0 : 50,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {activeVehicleType === "commercial" && (
                      <motion.video
                        key={`commercial-${activeView}`}
                        ref={(el) => {
                          videoRefs.current[`commercial-${activeView}`] = el;
                        }}
                        className="max-w-full max-h-[400px] object-contain"
                        autoPlay={isVideoPlaying}
                        muted
                        loop
                        playsInline
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <source
                          src={vehicleData.commercial.views[activeView]?.video}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </motion.video>
                    )}
                  </motion.div>
                </div>

                <motion.div
                  className="w-full flex justify-center relative z-10"
                  animate={{
                    opacity: scrollProgress > 0.15 ? 1 : 0,
                    y: scrollProgress > 0.15 ? 0 : 50,
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex justify-center items-center relative px-8">
                    <motion.div
                      className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8"
                      animate={{
                        opacity: activeVehicleType === "passenger" ? 1 : 0,
                        y: activeVehicleType === "passenger" ? 0 : 30,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {activeVehicleType === "passenger" &&
                        vehicleData.passenger.views.map((view, index) => (
                          <button
                            key={view.id}
                            type="button"
                            className={`flex flex-col items-center transition-all duration-300 hover:opacity-100 cursor-pointer ${
                              activeView === index
                                ? "opacity-100"
                                : "opacity-50"
                            }`}
                            onClick={() => {
                              setActiveView(index);
                              setIsAutoPlaying(false);
                            }}
                          >
                            <ViewIcon
                              type={view.icon}
                              isActive={activeView === index}
                              vehicleType="passenger"
                            />
                            <span className="mt-2 text-xs md:text-sm font-light text-center">
                              {view.name}
                            </span>
                          </button>
                        ))}
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center space-x-8 md:space-x-12 lg:space-x-16"
                      animate={{
                        opacity: activeVehicleType === "commercial" ? 1 : 0,
                        y: activeVehicleType === "commercial" ? 0 : 30,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {activeVehicleType === "commercial" &&
                        vehicleData.commercial.views.map((view, index) => (
                          <button
                            key={view.id}
                            type="button"
                            className={`flex flex-col items-center transition-all duration-300 hover:opacity-100 cursor-pointer ${
                              activeView === index
                                ? "opacity-100"
                                : "opacity-50"
                            }`}
                            onClick={() => {
                              setActiveView(index);
                              setIsAutoPlaying(false);
                            }}
                          >
                            <ViewIcon
                              type={view.icon}
                              isActive={activeView === index}
                              vehicleType="commercial"
                            />
                            <span className="mt-2 text-xs md:text-sm font-light text-center">
                              {view.name}
                            </span>
                          </button>
                        ))}
                    </motion.div>

                    {currentVehicle.views.length > 1 && (
                      <motion.div
                        className="absolute right-[-60px] md:right-[-80px] lg:right-[-100px] flex items-center"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative w-[60px] h-[60px] flex items-center justify-center">
                          <CircularProgress
                            progress={videoProgress}
                            size={60}
                          />

                          <button
                            type="button"
                            className="relative z-10 w-[48px] h-[48px] rounded-full bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-black/60 transition-all duration-300 flex items-center justify-center group"
                            onClick={handlePlayPause}
                            disabled={isVideoLoading}
                          >
                            {isVideoLoading ? (
                              <LoadingSpinner />
                            ) : isVideoPlaying ? (
                              <Pause className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-200" />
                            ) : (
                              <Play className="h-4 w-4 text-white ml-0.5 group-hover:scale-110 transition-transform duration-200" />
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
