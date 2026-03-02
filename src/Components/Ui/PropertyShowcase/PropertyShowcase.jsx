import React, { useState, useRef, useEffect } from "react";
import "./PropertyShowcase.css";
import CustomModal from "../../CustomModal/CustomModal";
import { Thumb } from "../ImageSlider/EmblaCarouselThumbsButton";
import CameraICon from "../../../assets/Icons/CameraIcon";
import LocationIcon from "../../../assets/Icons/LocationIcon";

const PropertyShowcase = ({
  images = [],
  location,
  lon,
  lat,
  className = "",
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const thumbnailRef = useRef(null);
  const modalThumbsRef = useRef(null);
  const modalTouchStartX = useRef(null);

  const defaultImages = [
    "https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+1",
    "https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+2",
    "https://via.placeholder.com/800x600/f0f0f0/666?text=Property+Image+3",
  ];

  const displayImages = images.length > 0 ? images : defaultImages;
  const total = displayImages.length;

  // Sync modal thumb scroll when index changes
  useEffect(() => {
    if (showModal && modalThumbsRef.current) {
      const thumbs = modalThumbsRef.current.querySelectorAll(".lb-thumb");
      if (thumbs[modalIndex]) {
        thumbs[modalIndex].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [modalIndex, showModal]);

  const openModal = (index) => {
    setModalIndex(index);
    setShowModal(true);
  };

  // Modal navigation
  const modalPrev = (e) => {
    e?.stopPropagation();
    setModalIndex((prev) => (prev - 1 + total) % total);
  };
  const modalNext = (e) => {
    e?.stopPropagation();
    setModalIndex((prev) => (prev + 1) % total);
  };

  // Modal swipe
  const onModalTouchStart = (e) => { modalTouchStartX.current = e.touches[0].clientX; };
  const onModalTouchEnd = (e) => {
    if (modalTouchStartX.current === null) return;
    const diff = modalTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? modalNext(e) : modalPrev(e);
    modalTouchStartX.current = null;
  };

  const onModalKeyDown = (e) => {
    if (e.key === "ArrowLeft") modalPrev();
    if (e.key === "ArrowRight") modalNext();
    if (e.key === "Escape") setShowModal(false);
  };

  // Side thumbnail drag scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - thumbnailRef.current.offsetTop);
    setScrollTop(thumbnailRef.current.scrollTop);
    thumbnailRef.current.style.cursor = "grabbing";
    thumbnailRef.current.style.userSelect = "none";
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.cursor = "grab";
      thumbnailRef.current.style.userSelect = "auto";
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    if (thumbnailRef.current) {
      thumbnailRef.current.style.cursor = "grab";
      thumbnailRef.current.style.userSelect = "auto";
    }
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.pageY - thumbnailRef.current.offsetTop;
    thumbnailRef.current.scrollTop = scrollTop - (y - startY) * 2;
  };
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].pageY - thumbnailRef.current.offsetTop);
    setScrollTop(thumbnailRef.current.scrollTop);
  };
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const y = e.touches[0].pageY - thumbnailRef.current.offsetTop;
    thumbnailRef.current.scrollTop = scrollTop - (y - startY) * 2;
  };
  const handleTouchEnd = () => { setIsDragging(false); };

  return (
    <div className="property-showcase">

      {/* ── Side Thumbnail Gallery ── */}
      <div
        className="thumbnail-gallery"
        ref={thumbnailRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: "grab" }}
      >
        {displayImages.map((image, index) => {
          const isLast = index === displayImages.length - 1;
          return (
            <div key={index} className="thumbnail-wrapper" style={{ position: "relative" }}>
              <Thumb
                selected={index === selectedImageIndex}
                onClick={() => setSelectedImageIndex(index)}
                imgSrc={image}
                images={displayImages}
                setShowModal={() => openModal(index)}
                showModal={showModal}
              />
              {isLast && (
                <div className="camera-icon-overlay-thumbnail">
                  <span
                    className="camera-icon b-16 d-flex space-2 align-items-center"
                    onClick={() => openModal(selectedImageIndex)}
                  >
                    {displayImages.length}
                    <CameraICon />
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Main Image ── */}
      <div className="main-image-container">
        <div className="main-image-wrapper">
          <img
            src={displayImages[selectedImageIndex]}
            alt="Main property view"
            className="main-image"
            onClick={() => openModal(selectedImageIndex)}
          />
          {/* Camera icon overlay */}
          <span
            className="camera-icon b-16 d-flex space-2 align-items-center main-camera-icon"
            onClick={() => openModal(selectedImageIndex)}
          >
            {total}
            <CameraICon />
          </span>
          {location && (
            <div className="location-overlay">
              <span className="d-flex align-items-center gap-1">
                <LocationIcon />
                {location}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ══ Lightbox Modal ══ */}
      <CustomModal
        showModal={showModal}
        onHide={() => setShowModal(false)}
        title={null}
        newClass={"lightbox-modal"}
      >
        <div
          className="lb-root"
          onKeyDown={onModalKeyDown}
          tabIndex={0}
          ref={(el) => el && el.focus()}
        >
          {/* Close button */}
          <button
            className="lb-close"
            onClick={() => setShowModal(false)}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Big image area */}
          <div
            className="lb-main"
            onTouchStart={onModalTouchStart}
            onTouchEnd={onModalTouchEnd}
          >
            <img
              src={displayImages[modalIndex]}
              alt={`Property image ${modalIndex + 1}`}
              className="lb-img"
            />

            {/* Counter */}
            <span className="lb-counter">{modalIndex + 1} / {total}</span>

            {/* Arrows */}
            {total > 1 && (
              <>
                <button className="lb-arrow lb-arrow--prev" onClick={modalPrev} aria-label="Previous">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="lb-arrow lb-arrow--next" onClick={modalNext} aria-label="Next">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {total > 1 && (
            <div className="lb-thumbs" ref={modalThumbsRef}>
              {displayImages.map((src, i) => (
                <button
                  key={i}
                  className={`lb-thumb${i === modalIndex ? " lb-thumb--active" : ""}`}
                  onClick={() => setModalIndex(i)}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default PropertyShowcase;
