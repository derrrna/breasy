Add-Type -AssemblyName System.Drawing

$root = "C:\Users\danna\WebstormProjects\breasy"
$imagesDir = Join-Path $root "assets\images"
New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null

$teal = [System.Drawing.ColorTranslator]::FromHtml("#168AAD")
$green = [System.Drawing.ColorTranslator]::FromHtml("#76C893")
$white = [System.Drawing.ColorTranslator]::FromHtml("#FEFEFE")

$pfc = New-Object System.Drawing.Text.PrivateFontCollection
$pfc.AddFontFile((Join-Path $root "node_modules\@expo\vector-icons\build\vendor\react-native-vector-icons\Fonts\FontAwesome6_Solid.ttf"))
$pfc.AddFontFile((Join-Path $root "assets\fonts\Vividly-Regular.otf"))
$faFamily = $pfc.Families | Where-Object { $_.Name -eq "Font Awesome 6 Free Solid" }
$vividlyFamily = $pfc.Families | Where-Object { $_.Name -eq "Vividly" }

$leafGlyph = [char]0xF06C

function Draw-CenteredGlyph($g, $family, [char]$glyph, $fontSize, $color, [double]$cx, [double]$cy) {
    $font = New-Object System.Drawing.Font($family, $fontSize, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $brush = New-Object System.Drawing.SolidBrush($color)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString([string]$glyph, $font, $brush, (New-Object System.Drawing.PointF([single]$cx, [single]$cy)), $sf)
    $font.Dispose(); $brush.Dispose()
}

# ---- icon.png (1024x1024, teal bg, green leaf) ----
$size = 1024
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear($teal)
Draw-CenteredGlyph $g $faFamily $leafGlyph ([double]$size * 0.5) $green ([double]$size/2) ([double]$size/2 * 1.02)
$bmp.Save((Join-Path $imagesDir "icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---- android-icon-foreground.png (1024x1024, transparent bg, green leaf within safe zone) ----
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)
Draw-CenteredGlyph $g $faFamily $leafGlyph ([double]$size * 0.38) $green ([double]$size/2) ([double]$size/2 * 1.02)
$bmp.Save((Join-Path $imagesDir "android-icon-foreground.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---- favicon.png (196x196, teal bg, green leaf) ----
$fSize = 196
$bmp = New-Object System.Drawing.Bitmap($fSize, $fSize)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear($teal)
Draw-CenteredGlyph $g $faFamily $leafGlyph ([double]$fSize * 0.55) $green ([double]$fSize/2) ([double]$fSize/2 * 1.02)
$bmp.Save((Join-Path $imagesDir "favicon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()

# ---- splash-icon.png (transparent bg, leaf + "breasy" wordmark + subtext) ----
$sw = 1200
$sh = 400
$bmp = New-Object System.Drawing.Bitmap($sw, $sh)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

$leafFont = New-Object System.Drawing.Font($faFamily, 120, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$titleFont = New-Object System.Drawing.Font($vividlyFamily, 150, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font("Arial", 48, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$greenBrush = New-Object System.Drawing.SolidBrush($green)
$whiteBrush = New-Object System.Drawing.SolidBrush($white)

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Near
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

$leafX = 40
$g.DrawString([string]$leafGlyph, $leafFont, $greenBrush, (New-Object System.Drawing.PointF([single]$leafX, [single]([double]$sh/2 * 1.02))), $sf)

$titleX = 210
$g.DrawString("breasy", $titleFont, $whiteBrush, (New-Object System.Drawing.PointF([single]$titleX, [single]([double]$sh/2 - 40))), $sf)
$g.DrawString("breathe easier", $subFont, $whiteBrush, (New-Object System.Drawing.PointF([single]($titleX + 8), [single]([double]$sh/2 + 110))), $sf)

$bmp.Save((Join-Path $imagesDir "splash-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$leafFont.Dispose(); $titleFont.Dispose(); $subFont.Dispose()
$greenBrush.Dispose(); $whiteBrush.Dispose()
$g.Dispose(); $bmp.Dispose()

Write-Output "Generated: icon.png, android-icon-foreground.png, favicon.png, splash-icon.png"
