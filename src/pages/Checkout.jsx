import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PAYMENT_METHODS, SITE } from "../config/site";
import { useCart } from "../context/CartContext";
import { formatLongDate, formatRupiah, minPickupDate } from "../utils/format";
import { buildOrderMessage, buildWhatsAppUrl } from "../utils/whatsapp";

const INITIAL_FORM = { name: "", notes: "", pickupDate: "", pickupTime: "", payment: "" };

function validate(form, minDate) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Isi nama lengkap kamu.";
  if (!form.pickupDate) errors.pickupDate = "Pilih tanggal pengambilan.";
  else if (form.pickupDate < minDate)
    errors.pickupDate = `Paling cepat ${formatLongDate(minDate)}.`;
  if (!form.pickupTime) errors.pickupTime = "Pilih jam pengambilan.";
  if (!form.payment) errors.payment = "Pilih metode pembayaran.";
  return errors;
}

function Section({ title, children }) {
  return (
    <section className="card space-y-5 p-5 sm:p-6">
      <h2 className="font-display text-xl font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

function Field({ id, label, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-navy/60">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-semibold text-brand">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Checkout() {
  const { items, totalPrice, clearCart, openCart } = useCart();
  const navigate = useNavigate();

  const minDate = useMemo(() => minPickupDate(SITE.minLeadDays), []);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [waUrl, setWaUrl] = useState("");

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validate(form, minDate);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    const message = buildOrderMessage({
      ...form,
      name: form.name.trim(),
      notes: form.notes.trim(),
      items,
      total: totalPrice,
    });

    const url = buildWhatsAppUrl(message);
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function finish() {
    clearCart();
    navigate("/menu");
  }

  if (items.length === 0 && !waUrl) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold leading-tight">
          Perut Masih Kosong, Keranjang Juga Kosong! 🛒
        </h1>
        <p className="mt-3 text-navy/75">Yuk pilih cemilan favoritmu dulu.</p>
        <Link to="/menu" className="btn-primary mt-8">
          Lihat menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
        <form id="checkout-form" onSubmit={handleSubmit} noValidate className="space-y-6">
          <Section title="1. Data pemesan">
            <Field id="field-name" label="Nama lengkap" error={errors.name}>
              <input
                id="field-name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={setField("name")}
                placeholder="Nama kamu"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "field-name-error" : undefined}
                className="field"
              />
            </Field>
            <Field
              id="field-notes"
              label="Catatan khusus (opsional)"
              hint="Misalnya: es-nya dikit aja, saus dipisah."
            >
              <textarea
                id="field-notes"
                rows={3}
                maxLength={300}
                value={form.notes}
                onChange={setField("notes")}
                className="field resize-none"
              />
            </Field>
          </Section>

          <Section title="2. Pengambilan pesanan">
            <p className="rounded-xl border-2 border-dashed border-navy px-4 py-3 text-sm">
              Pickup Point: <strong>{SITE.pickupLocation}</strong> • Jam ambil{" "}
              <strong>{SITE.hoursLabel}</strong>
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="field-pickupDate" label="Tanggal" error={errors.pickupDate}>
                <input
                  id="field-pickupDate"
                  type="date"
                  min={minDate}
                  value={form.pickupDate}
                  onChange={setField("pickupDate")}
                  aria-invalid={Boolean(errors.pickupDate)}
                  aria-describedby={errors.pickupDate ? "field-pickupDate-error" : undefined}
                  className="field"
                />
              </Field>
              <Field id="field-pickupTime" label="Jam" error={errors.pickupTime}>
                <select
                  id="field-pickupTime"
                  value={form.pickupTime}
                  onChange={setField("pickupTime")}
                  aria-invalid={Boolean(errors.pickupTime)}
                  aria-describedby={errors.pickupTime ? "field-pickupTime-error" : undefined}
                  className="field"
                >
                  <option value="">Pilih jam</option>
                  {SITE.pickupSlots.map((t) => (
                    <option key={t} value={t}>
                      {t} WIB
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          <Section title="3. Metode pembayaran">
            <fieldset>
              <legend className="sr-only">Metode pembayaran</legend>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((m, i) => (
                  <label
                    key={m.id}
                    className="flex cursor-pointer gap-3 rounded-xl border-2 border-navy bg-cream p-3.5 transition has-[:checked]:bg-sun"
                  >
                    <input
                      id={i === 0 ? "field-payment" : undefined}
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={form.payment === m.id}
                      onChange={setField("payment")}
                      className="mt-1 size-4 accent-navy"
                    />
                    <span>
                      <span className="block font-bold">{m.label}</span>
                      <span className="block text-sm text-navy/70">{m.hint}</span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.payment && (
                <p role="alert" className="mt-2 text-sm font-semibold text-brand">
                  {errors.payment}
                </p>
              )}
            </fieldset>

            {form.payment === "qris-now" && (
              <div className="rounded-xl border-2 border-dashed border-navy p-4 text-center">
                <img
                  src="/qris.png"
                  alt="QRIS Kodinc"
                  className="mx-auto w-56 max-w-full"
                  onError={(e) => (e.currentTarget.hidden = true)}
                />
                <p className="mt-2 text-sm">
                  Bayar sesuai total pesanan, lalu kirim bukti pembayaran ke WhatsApp setelah
                  pesan ini terkirim.
                </p>
              </div>
            )}
          </Section>
        </form>

        <aside className="card p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-extrabold">Ringkasan pesanan</h2>

          <ul className="mt-4 divide-y divide-navy/15">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3 py-2.5 text-sm">
                <span>
                  {item.name} <span className="text-navy/60">×{item.qty}</span>
                </span>
                <span className="shrink-0 font-semibold">{formatRupiah(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-baseline justify-between border-t-2 border-navy pt-4">
            <span className="font-bold">Total</span>
            <span className="font-display text-2xl font-extrabold">{formatRupiah(totalPrice)}</span>
          </div>

          <button type="submit" form="checkout-form" className="btn-primary mt-5 w-full text-lg">
            Lanjut Pesan via WhatsApp 🚀
          </button>
          <p className="mt-3 text-center text-xs text-navy/60">
            Pesanan dikonfirmasi setelah penjual membalas di WhatsApp.
          </p>

          {waUrl && (
            <div role="status" className="mt-5 rounded-xl border-2 border-navy bg-sand p-4 text-sm">
              <p className="font-bold">WhatsApp sudah dibuka.</p>
              <p className="mt-1">
                Tekan kirim di WhatsApp. Belum terbuka?{" "}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline underline-offset-4"
                >
                  Buka lagi
                </a>
                .
              </p>
              <button type="button" onClick={finish} className="btn-light mt-3 w-full">
                Sudah terkirim, kosongkan keranjang
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={openCart}
            className="mt-4 block w-full text-center text-sm font-semibold underline underline-offset-4"
          >
            Ubah keranjang
          </button>
        </aside>
      </div>
    </div>
  );
}