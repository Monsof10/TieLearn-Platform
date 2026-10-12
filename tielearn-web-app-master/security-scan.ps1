param(
    [Parameter(Mandatory = $true)]
    [string]$Image
)

Write-Host "========================================"
Write-Host "       TieLearn Docker Security Gate"
Write-Host "========================================"
Write-Host ""
Write-Host "Image: $Image"
Write-Host ""

# Run Docker Scout once and get SARIF results
$result = docker scout cves $Image --format sarif 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker Scout scan failed."
    exit 1
}

# Convert SARIF JSON into a PowerShell object
$sarif = $result | ConvertFrom-Json

# Counters
$critical = 0
$high = 0
$medium = 0
$low = 0

# Count vulnerabilities by severity
foreach ($rule in $sarif.runs[0].tool.driver.rules) {

    $severity = $rule.properties.cvssV3_severity

    switch ($severity) {
        "CRITICAL" { $critical++ }
        "HIGH" { $high++ }
        "MEDIUM" { $medium++ }
        "LOW" { $low++ }
    }
}

# Display results
Write-Host "========================================"
Write-Host "          Vulnerability Summary"
Write-Host "========================================"
Write-Host "Critical : $critical"
Write-Host "High     : $high"
Write-Host "Medium   : $medium"
Write-Host "Low      : $low"
Write-Host ""

# Security policy
Write-Host "========================================"
Write-Host "          Security Policy"
Write-Host "========================================"
Write-Host "Critical → FAIL"
Write-Host "High     → FAIL"
Write-Host "Medium   → ALLOW"
Write-Host "Low      → ALLOW"
Write-Host ""

# Security gate
if ($critical -gt 0) {
    Write-Host "❌ SECURITY GATE FAILED"
    Write-Host "Reason: Critical vulnerabilities detected."
    exit 1
}

if ($high -gt 0) {
    Write-Host "❌ SECURITY GATE FAILED"
    Write-Host "Reason: High vulnerabilities detected."
    exit 1
}

Write-Host "✅ SECURITY GATE PASSED"
Write-Host "No Critical or High vulnerabilities detected."
exit 0