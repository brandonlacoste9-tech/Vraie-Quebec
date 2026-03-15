"use client"

export function FooterNewsletterForm() {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="votre@courriel.com"
        className="input-luxury bg-[#2A2722] border-[#3A3630] text-[#FAF8F5] placeholder-[#6B6460] text-[13px]"
        aria-label="Adresse courriel"
      />
      <button type="submit" className="btn-luxury text-[11px] w-full">
        S'inscrire
      </button>
    </form>
  )
}
