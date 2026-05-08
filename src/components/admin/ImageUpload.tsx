"use client";

import { useState } from "react";
import { uploadImage } from "@/actions/upload";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
};

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadImage(formData);
      onChange(res.url);
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah gambar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value ? (
          <div className="relative w-40 h-40 border-2 border-foreground group">
            <Image
              fill
              src={value}
              alt="Product image"
              className="object-cover"
            />
            <button
              onClick={onRemove}
              type="button"
              className="absolute top-1 right-1 p-1 bg-secondary text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="w-40 h-40 border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-foreground transition-colors bg-muted/20">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Mengunggah...</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Upload Foto</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              disabled={loading}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
        * Format: JPG, PNG, WEBP. Maks 2MB.
      </p>
    </div>
  );
}
