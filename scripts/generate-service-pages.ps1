$services = @(
  @{
    slug = 'interior-fitout-dubai'
    title = 'Interior Fitout Dubai | Offices, Retail & Villas | FPLUS'
    h1 = 'Interior Fitout in Dubai'
    kicker = 'Fitout Works &middot; Dubai &amp; Sharjah'
    img = 'service-fitout.png'
    lead = 'Complete interior fitout for offices, retail units and villas &mdash; layout, finishes and MEP coordination from one licensed contractor.'
    wa = 'Interior%20fitout%20Dubai%20-%20FPLUS'
    bullets = @(
      'Office and retail shop fitout',
      'Villa and apartment interior packages',
      'Design coordination and Dubai Municipality support',
      'Integrated HVAC, electrical and plumbing'
    )
  },
  @{
    slug = 'gypsum-partitioning-dubai'
    title = 'Gypsum & Partitioning Dubai | FPLUS Technical Services'
    h1 = 'Gypsum & Partitioning in Dubai'
    kicker = 'Fitout Works &middot; Partition walls'
    img = 'service-fitout.png'
    lead = 'Gypsum board partitions, acoustic walls and light internal divisions for offices, clinics and homes across Dubai and Sharjah.'
    wa = 'Gypsum%20partitioning%20Dubai%20-%20FPLUS'
    bullets = @(
      'Metal stud and gypsum partition walls',
      'Acoustic and fire-rated partitions',
      'Door openings and bulkheads',
      'Occupied-building works with dust control'
    )
  },
  @{
    slug = 'ceilings-flooring-dubai'
    title = 'Ceilings & Flooring Dubai | FPLUS Fitout'
    h1 = 'Ceilings & Flooring in Dubai'
    kicker = 'Fitout Works &middot; Finishes'
    img = 'hero-panel-bottom.png'
    lead = 'Suspended ceilings, gypsum bulkheads, tiling, vinyl and wooden flooring for commercial and residential properties.'
    wa = 'Ceilings%20and%20flooring%20Dubai%20-%20FPLUS'
    bullets = @(
      'False ceilings and feature bulkheads',
      'Porcelain, ceramic and stone tiling',
      'SPC, vinyl and engineered wood flooring',
      'Skirting, thresholds and floor levelling'
    )
  },
  @{
    slug = 'custom-carpentry-dubai'
    title = 'Custom Carpentry Dubai | Joinery & Built-ins | FPLUS'
    h1 = 'Custom Carpentry in Dubai'
    kicker = 'Fitout Works &middot; Joinery'
    img = 'service-fitout.png'
    lead = 'Bespoke joinery, wardrobes, reception desks and fitted furniture for offices, retail and villas.'
    wa = 'Custom%20carpentry%20Dubai%20-%20FPLUS'
    bullets = @(
      'Wardrobes and bedroom joinery',
      'Kitchen carcasses and vanity units',
      'Reception counters and display units',
      'Doors, frames and wall panelling'
    )
  },
  @{
    slug = 'painting-repainting-dubai'
    title = 'Painting & Repainting Dubai | FPLUS Maintenance'
    h1 = 'Painting & Repainting in Dubai'
    kicker = 'Building Maintenance'
    img = 'about-team.png'
    lead = 'Interior and exterior painting, touch-ups and full repainting for apartments, villas and commercial units.'
    wa = 'Painting%20Dubai%20-%20FPLUS'
    bullets = @(
      'Wall preparation and crack repair',
      'Low-VOC interior emulsion systems',
      'Exterior façade repainting',
      'Occupied units with furniture protection'
    )
  },
  @{
    slug = 'kitchen-renovation-dubai'
    title = 'Kitchen Renovation Dubai | FPLUS'
    h1 = 'Kitchen Renovation in Dubai'
    kicker = 'Renovation & Upgrades'
    img = 'hero-panel-bottom.png'
    lead = 'Full kitchen upgrades &mdash; layout, cabinetry, countertops, appliances and MEP for villas and apartments.'
    wa = 'Kitchen%20renovation%20Dubai%20-%20FPLUS'
    bullets = @(
      'Kitchen layout and design coordination',
      'Cabinet supply and installation',
      'Plumbing and electrical for kitchens',
      'Tiling, lighting and appliance fit-off'
    )
  },
  @{
    slug = 'bathroom-remodelling-dubai'
    title = 'Bathroom Remodelling Dubai | FPLUS'
    h1 = 'Bathroom Remodelling in Dubai'
    kicker = 'Renovation & Upgrades'
    img = 'service-plumbing.png'
    lead = 'Bathroom upgrades with waterproofing, tiling, sanitary ware and ventilation for Dubai homes.'
    wa = 'Bathroom%20remodelling%20Dubai%20-%20FPLUS'
    bullets = @(
      'Strip-out and waterproofing systems',
      'Sanitary fixture replacement',
      'Wall and floor tiling',
      'Exhaust fans and electrical points'
    )
  },
  @{
    slug = 'villa-renovation-dubai'
    title = 'Full Villa Renovation Dubai | FPLUS'
    h1 = 'Full Villa Renovation in Dubai'
    kicker = 'Renovation & Upgrades'
    img = 'about-team.png'
    lead = 'Turnkey villa renovation &mdash; structure, MEP, interiors and external works with single-contractor accountability.'
    wa = 'Villa%20renovation%20Dubai%20-%20FPLUS'
    bullets = @(
      'Whole-villa interior and exterior scope',
      'MEP upgrades and fit-out',
      'Extensions and layout changes where permitted',
      'Phased works for occupied properties'
    )
  }
)

$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <meta name="description" content="{{LEAD}} Licensed FPLUS &middot; DET 1551959 &middot; +971 50 720 4645.">
  <link rel="canonical" href="https://fplus.ae/services/{{SLUG}}.html">
  <link rel="icon" href="/assets/logo.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <link href="/css/styles.css" rel="stylesheet">
  <link href="/css/service-page.css" rel="stylesheet">
  <link href="/css/rtl.css" rel="stylesheet">
</head>
<body class="svc-page">
  <nav>
    <a class="logo" href="../index.html"><img src="../assets/logo.png" alt="FPLUS" class="logo-icon"><span class="logo-text"><span class="logo-fplus">FPLUS</span><span class="logo-ts">Technical Services</span></span></a>
    <ul class="nav-links"><li><a href="index.html">Services</a></li><li><a href="../index.html#contact">Contact</a></li></ul>
    <a href="https://wa.me/971507204645?text={{WA}}" class="nav-cta" target="_blank" rel="noopener">Get a Quote</a>
  </nav>
  <header class="svc-page-hero svc-page-hero--with-img">
    <div class="svc-page-hero-inner">
      <div>
        <nav class="svc-breadcrumb"><a href="../index.html">Home</a> / <a href="index.html">Services</a> / <span>{{H1}}</span></nav>
        <div class="svc-page-kicker">{{KICKER}}</div>
        <h1>{{H1}}</h1>
        <p class="svc-page-hero-lead">{{LEAD}}</p>
        <div class="svc-page-ctas">
          <a class="svc-btn-primary" href="https://wa.me/971507204645?text={{WA}}" target="_blank" rel="noopener">WhatsApp FPLUS</a>
          <a class="svc-btn-secondary" href="tel:+971507204645">Call Now</a>
        </div>
      </div>
      <div class="svc-hero-visual">
        <img src="../assets/{{IMG}}" alt="{{H1}} &mdash; FPLUS Technical Services" width="600" height="450">
      </div>
    </div>
  </header>
  <main class="svc-page-main">
    <div class="svc-split">
      <div class="svc-split-text">
        <h2>What we deliver</h2>
        <ul>{{BULLETS}}</ul>
      </div>
      <div class="svc-media">
        <div class="svc-placeholder"><span class="svc-placeholder-tag">Project photo</span><span class="svc-placeholder-label">Add your Dubai project image</span></div>
      </div>
    </div>
    <div class="svc-contact-cta">
      <h2>Request a quote</h2>
      <p>FPLUS Technical Services L.L.C &mdash; Dubai &amp; Sharjah &middot; License 1551959</p>
      <a class="svc-btn-primary" href="https://wa.me/971507204645?text={{WA}}" target="_blank" rel="noopener">WhatsApp</a>
      <a class="svc-btn-secondary" href="../index.html#contact">Contact form</a>
    </div>
  </main>
  <footer><div class="fc">&copy; 2025 FPLUS &middot; {{H1}} &middot; Lic. 1551959</div></footer>
  <div class="svc-sticky-mobile"><a class="svc-sticky-call" href="tel:+971507204645">Call</a><a class="svc-sticky-wa" href="https://wa.me/971507204645" target="_blank" rel="noopener">WhatsApp</a></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
'@

$outDir = Join-Path $PSScriptRoot '..\services'
foreach ($s in $services) {
  $bullets = ($s.bullets | ForEach-Object { "          <li>$_</li>" }) -join "`n"
  $html = $template
  $html = $html.Replace('{{SLUG}}', $s.slug)
  $html = $html.Replace('{{TITLE}}', $s.title)
  $html = $html.Replace('{{H1}}', $s.h1)
  $html = $html.Replace('{{KICKER}}', $s.kicker)
  $html = $html.Replace('{{IMG}}', $s.img)
  $html = $html.Replace('{{LEAD}}', $s.lead)
  $html = $html.Replace('{{WA}}', $s.wa)
  $html = $html.Replace('{{BULLETS}}', $bullets)
  $path = Join-Path $outDir ($s.slug + '.html')
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [IO.File]::WriteAllText($path, $html, $utf8)
  Write-Host "Wrote $path"
}
