import { useRef, useState, useEffect } from "react";
import { ProductImage } from "../types/productFormTypes";
import { CiCamera as Camera } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

interface Props {
  images: ProductImage[];
  onAdd: (files: FileList) => void;
  onClose: () => void;
  onSave: (newImages: ProductImage[]) => void;
}

/**
 * ProductGallery modal for product images management.
 * All changes are kept local until the user clicks "Save".
 */
export default function ProductGallery({
  images,
  onAdd,
  onClose,
  onSave,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Local state for editing images before saving to the form.
  const [localImages, setLocalImages] = useState<ProductImage[]>(images);
  const [selected, setSelected] = useState<number>(0); // index of main image

  // Sync local state with props.images every time the modal is opened
  useEffect(() => {
    setLocalImages(images);
    setSelected(0);
  }, [images]);

  /**
   * Handle new image file(s) upload.
   * Uses Array.from to safely map the FileList (never pass null).
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newImgs: ProductImage[] = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      file,
      isNew: true,
    }));
    setLocalImages((prev) => [...prev, ...newImgs]);
    onAdd(e.target.files); // If needed outside (optional, can be empty)
    e.target.value = ""; // Reset input so user can re-add same file if needed
  };

  /**
   * Mark an image as favorite (only one can be favorite).
   */
  const handleFavorite = (idx: number) => {
    setLocalImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isFavorite: i === idx,
      }))
    );
    setSelected(idx);
  };

  /**
   * Remove an image from the gallery.
   */
  const handleRemove = (idx: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== idx));
    if (selected >= idx && selected > 0) setSelected(selected - 1);
  };

  /**
   * Confirm changes and pass images to parent form.
   */
  const handleSave = () => {
    onSave(localImages);
    onClose();
  };

  /**
   * Select an image as main (for preview).
   */
  const handleSelect = (idx: number) => setSelected(idx);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30"
      style={{
        backgroundColor: "rgba(0,0,0,0.20)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="bg-white rounded-xl w-[520px] max-w-full mx-auto shadow-lg relative p-6">
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-red-500 text-2xl font-bold cursor-pointer"
          onClick={onClose}
          title="Close"
        >
          &times;
        </button>

        <div className="font-bold text-lg mb-1">Product Gallery</div>
        <div className="text-sm text-gray-500 mb-4">
          Agrega imagenes de referencia para tu producto.
        </div>
        <div className="flex items-center mb-4">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </div>
        <div className="border-dashed border-2 border-gray-300 rounded-xl min-h-[200px] flex flex-col items-center justify-center mb-4 bg-gray-50 relative">
          {localImages.length > 0 ? (
            <div className="relative w-full flex flex-col items-center">
              {/* Main image */}
              <img
                src={localImages[selected].url}
                alt="Main product"
                className="w-[90%] h-[180px] object-contain rounded-lg mt-2"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {localImages[selected].isFavorite && (
                  <span className="bg-yellow-400 text-xs px-2 py-0.5 rounded flex items-center">
                    <FaStar className="text-white mr-1" /> Favorite
                  </span>
                )}
              </div>
              <button
                className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-base cursor-pointer"
                onClick={() => handleRemove(selected)}
                title="Remove"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10">
              <Camera className="w-10 h-10 text-gray-300 mb-2" />
              <div className="text-gray-400 text-sm">
                <span className="font-bold">+</span> Add images here
              </div>
            </div>
          )}
        </div>
        {/* Thumbnails */}
        <div className="flex items-center gap-2 mb-4">
          {localImages.map((img, i) => (
            <div
              key={img.id}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer
                ${
                  selected === i ? "border-emerald-500" : "border-transparent"
                }`}
              onClick={() => handleSelect(i)}
            >
              <img
                src={img.url}
                alt=""
                className="object-cover w-full h-full"
              />
              <button
                className="absolute top-1 left-1 bg-yellow-400 text-white rounded px-1 py-0.5 text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(i);
                }}
                title="Mark as favorite"
              >
                <FaStar
                  className={img.isFavorite ? "text-white" : "text-gray-200"}
                />
              </button>

            </div>
          ))}
          {/* Button to add new image from thumbnail row */}
          <button
            className="w-16 h-16 rounded-lg bg-gray-100 border-dashed border-2 border-gray-300 flex items-center justify-center text-2xl text-gray-400 cursor-pointer"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            +
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md font-semibold cursor-pointer"
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
