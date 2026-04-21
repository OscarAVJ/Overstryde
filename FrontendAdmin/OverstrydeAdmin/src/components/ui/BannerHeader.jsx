import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

export function BannerHeader() {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [link, setLink] = React.useState("");
  const [tag, setTag] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setLink("");
      setTag("");
      setImage(null);
      setPreview(null);
      setErrors({});
    }
  }, [open]);

  const handleSave = () => {
    const data = {
      title,
      description,
      link,
      tag,
      image
    };

    console.log("Nuevo banner:", data);
    setOpen(false);
  };
  const handleImageChange = (file) => {
    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };
  const validation = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Título requerido";
    if (!description.trim()) newErrors.description = "Descripción requerida";
    if (!link.trim()) newErrors.link = "Link requerido";
    if (!tag.trim()) newErrors.tag = "Etiqueta requerida";
    if (!image) newErrors.image = "Imagen requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <>
      <div className="flex items-center justify-between gap-4">

        <Input
          placeholder="Buscar banners..."
        />

        <div className="flex gap-2">
          <Button
            className="text-white"
            onClick={() => setOpen(true)}
          >
            <Plus className="size-4 mr-1" />
            Nuevo banner
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            !max-w-md
            w-full
            p-0
            rounded-xl
            overflow-hidden
          "
        >

          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-lg font-semibold">
              Nuevo Banner
            </DialogTitle>
            <DialogDescription>
              Crea un banner promocional
            </DialogDescription>
          </DialogHeader>

          <div
            className="
              px-6 pb-4
              max-h-[60vh]
              overflow-y-auto
              overflow-x-hidden   
              space-y-4
            "
          >

            <Input
              placeholder="Título del banner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full focus-visible:ring-2 focus-visible:ring-yellow-400"
            />

            <Textarea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                w-full
                min-h-[100px]
                resize-none
                focus-visible:ring-2 
                focus-visible:ring-yellow-400
              "
            />

            <Input
              placeholder="Link (https://...)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full focus-visible:ring-2 focus-visible:ring-yellow-400"
            />

            <Input
              placeholder="Etiqueta (Ej: Verano, Navidad, 50% OFF)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="
                w-full
                truncate   
                focus-visible:ring-2 
                focus-visible:ring-yellow-400
              "
            />

            <div className="space-y-2">
              <label className="text-sm font-medium block">
                Imagen del banner
              </label>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                className="hidden"
              />


              {!preview && (
                <label
                  htmlFor="fileUpload"
                  className="
        flex flex-col items-center justify-center
        w-full h-32
        border border-dashed border-gray-300
        rounded-lg
        cursor-pointer
        bg-gray-50
        hover:bg-gray-100
        transition
        text-sm text-gray-500
      "
                >
                  <span className="text-center px-2">
                    Haz clic para subir una imagen
                    <br />
                    <span className="text-xs text-gray-400">
                      PNG, JPG hasta 5MB
                    </span>
                  </span>
                </label>
              )}


              {preview && (
                <div className="relative group">

                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <label
                    htmlFor="fileUpload"
                    className="
          absolute inset-0
          bg-black/40
          flex items-center justify-center
          text-white text-sm
          opacity-0 group-hover:opacity-100
          transition
          cursor-pointer
          rounded-lg
        "
                  >
                    Cambiar imagen
                  </label>

                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 p-4 border-t bg-white">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>

            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={handleSave}
            >
              Guardar
            </Button>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}