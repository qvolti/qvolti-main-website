'use client';
import * as React from "react";
import { ArrowRight } from "lucide-react";

const WEB3_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

interface FormData {
  tipoProyecto: string;
  presupuesto: string;
  nombre: string;
  email: string;
  mensaje: string;
}

export default function FormBurbujas() {
  const [form, setForm] = React.useState<FormData>({
    tipoProyecto: "",
    presupuesto: "",
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [successModal, setSuccessModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const opcionesProyecto = ["Solar", "Aerotermia", "Industrial", "Residencial"];
  const rangosPresupuesto = ["<10K", "10K–50K", "50K–200K", ">200K"];

  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const message = `
Nuevo proyecto desde QVOLTI

Tipo: ${form.tipoProyecto}
Presupuesto: ${form.presupuesto}

Cliente:
Nombre: ${form.nombre}
Email: ${form.email}

Mensaje:
${form.mensaje}
    `.trim();

    const formData = new FormData();
    formData.append("access_key", WEB3_KEY);
    formData.append("subject", "Nuevo proyecto enviado desde la web QVOLTI");
    formData.append("from_name", form.nombre);
    formData.append("from_email", form.email);
    formData.append("reply_to", form.email);
    formData.append("message", message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setSuccessModal(true);
        setForm({
          tipoProyecto: "",
          presupuesto: "",
          nombre: "",
          email: "",
          mensaje: "",
        });
      } else {
        setErrorModal(true);
      }
    } catch {
      setLoading(false);
      setErrorModal(true);
    }
  };

  return (
    <>
      <section id="contacto" className="relative min-h-screen flex items-center justify-center px-6 py-20">

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white/70 backdrop-blur-xl border border-(--muted)/20 
                     rounded-3xl shadow-xl p-10 md:p-12 flex flex-col gap-10"
        >
          {/* TITULO */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-(--primary)">
              Cuéntanos sobre tu <span className="text-(--secondary)">proyecto</span>
            </h2>
            <p className="text-(--text)/70 mt-3">Completa los pasos y diseñaremos una solución personalizada.</p>
          </div>

          {/* TIPO DE PROYECTO */}
      
          <div>
            <label className="block text-lg font-semibold mb-4 text-(--primary)">Tipo de proyecto</label>

            <div className="flex flex-wrap gap-3">
              {opcionesProyecto.map((opt) => {
                const selected = form.tipoProyecto === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange("tipoProyecto", opt)}
                    className={`
                      px-5 py-2 rounded-full text-sm font-medium cursor-pointer
                      transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                      border border-(--muted)/30 backdrop-blur-sm

                      ${
                        selected
                          ? "bg-(--primary) text-white shadow-xl scale-[1.03] animate-[pulse_2s_ease-in-out_infinite]"
                          : "bg-white text-(--text)"
                      }

                      ${
                        !selected &&
                        "hover:bg-gradient-to-r hover:from-(--primary)/60 hover:via-(--secondary)/60 hover:to-(--primary)/60 hover:text-white hover:shadow-xl hover:scale-[1.07]"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>


          {/* PRESUPUESTO */}
          <div>
            <label className="block text-lg font-semibold mb-4 text-(--primary)">Presupuesto estimado</label>

            <div className="flex flex-wrap gap-3">
              {rangosPresupuesto.map((opt) => {
                const selected = form.presupuesto === opt;

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange("presupuesto", opt)}
                    className={`
                      px-5 py-2 rounded-full text-sm font-medium cursor-pointer
                      transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                      border border-(--muted)/30 backdrop-blur-sm

                      ${
                        selected
                          ? "bg-(--secondary) text-white shadow-xl scale-[1.03] animate-[pulse_2s_ease-in-out_infinite]"
                          : "bg-white text-(--text)"
                      }

                      ${
                        !selected &&
                        "hover:bg-gradient-to-r hover:from-(--primary)/60 hover:via-(--secondary)/60 hover:to-(--primary)/60 hover:text-white hover:shadow-xl hover:scale-[1.07]"
                      }
                    `}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>


          {/* DATOS */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              value={form.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              placeholder="Tu nombre"
              className="px-4 py-3 rounded-lg border border-(--muted)/30"
            />
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="correo@ejemplo.com"
              className="px-4 py-3 rounded-lg border border-(--muted)/30"
            />
          </div>

          {/* MENSAJE */}
          <textarea
            rows={4}
            value={form.mensaje}
            onChange={(e) => handleChange("mensaje", e.target.value)}
            placeholder="Cuéntanos más sobre tu proyecto..."
            className="px-4 py-3 rounded-lg border border-(--muted)/30"
          />

          {/* BOTÓN */}
          <button
            disabled={loading}
            className="group px-10 py-3 rounded-full bg-(--primary)
                       text-white font-semibold shadow-lg  hover:bg-(--secondary)/80 cursor-pointer transition duration-500"
          >
            {loading ? "Enviando..." : <>Enviar <ArrowRight className="inline w-4 h-4 group-hover:scale-125" /></>}
          </button>
        </form>

        {/* MODALES */}
        {successModal && (
          <Modal 
            title="¡Mensaje enviado!" 
            text="Gracias por escribirnos. Nos pondremos en contacto con usted lo antes posible."
            onClose={() => setSuccessModal(false)}
          />
        )}

        {errorModal && (
          <Modal
            title="Hubo un error"
            text="Inténtalo más tarde o escríbenos a info@qvolti.com"
            onClose={() => setErrorModal(false)}
          />
        )}
      </section>
    </>
  );
}
function Modal({ title, text, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
      
      {/* Contenedor absoluto centrado inequívocamente */}
      <div className="
        absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        bg-white rounded-2xl p-8 max-w-sm w-[90%]
        flex flex-col items-center justify-center shadow-xl
      ">
        
        <img src="/logo.png" alt="logo" className="w-18 aspect-square" />

        <h3 className="text-2xl font-semibold text-(--primary) font-bold">
          {title}
        </h3>

        <p className="text-(--text)/70 mt-3 italic text-center">
          {text}
        </p>

        <button 
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-(--primary) text-white rounded-full shadow hover:bg-(--secondary)"
        >
          Cerrar
        </button>

      </div>

    </div>
  );
}
