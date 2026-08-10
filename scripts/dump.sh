#!/bin/bash

# ==============================================================================
# Script to dump all Azure and App variables for Kubernetes manifest generation
# ==============================================================================

# 1. Source local .env if present (to pick up app secrets)
if [ -f ".env" ]; then
  # Load non-comment lines from .env without overriding already exported shell vars
  set -a
  source .env 2>/dev/null || true
  set +a
fi

# 2. Defaults / Inferred from Azure CLI if available
RG="${RG:-event-scheduler-rg}"
CLUSTER_NAME="${CLUSTER_NAME:-aks-eventscheduler}"
ACR_NAME="${ACR_NAME:-eventscheduleracr24944}"
PG_SERVER="${PG_SERVER:-event-scheduler-22536}"

# Query ACR login server from Azure CLI if not set
if [ -z "$ACR_LOGIN_SERVER" ]; then
  ACR_LOGIN_SERVER=$(az acr show --name "$ACR_NAME" --query loginServer -o tsv 2>/dev/null || echo "${ACR_NAME}.azurecr.io")
fi

# Query AKS outbound IP from Azure CLI if not set
if [ -z "$AKS_OUTBOUND_IP" ]; then
  NODE_RG=$(az aks show --resource-group "$RG" --name "$CLUSTER_NAME" --query "nodeResourceGroup" -o tsv 2>/dev/null)
  if [ -n "$NODE_RG" ]; then
    AKS_OUTBOUND_IP=$(az network public-ip list --resource-group "$NODE_RG" --query "[0].ipAddress" -o tsv 2>/dev/null)
  fi
fi

# 3. Write variables to .k8s-vars.env
cat <<EOF > .k8s-vars.env
# Generated Azure & Application Configuration
RG="$RG"
CLUSTER_NAME="$CLUSTER_NAME"
ACR_NAME="$ACR_NAME"
ACR_LOGIN_SERVER="$ACR_LOGIN_SERVER"
PG_SERVER="$PG_SERVER"
AKS_OUTBOUND_IP="$AKS_OUTBOUND_IP"

# Database Configuration
DATABASE_URL="$DATABASE_URL"
TEMPORAL_DB_URL="$TEMPORAL_DB_URL"
TEMPORAL_VISIBILITY_DB_URL="$TEMPORAL_VISIBILITY_DB_URL"

# Google OAuth & Calendar
GOOGLE_CLIENT_ID="$GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="$GOOGLE_CLIENT_SECRET"
GOOGLE_REFRESH_TOKEN="$GOOGLE_REFRESH_TOKEN"
GOOGLE_REDIRECT_URI="$GOOGLE_REDIRECT_URI"
GOOGLE_SENDER_EMAIL="$GOOGLE_SENDER_EMAIL"
GOOGLE_CALENDAR_ID="$GOOGLE_CALENDAR_ID"

# Mailer / SMTP
SMTP_HOST="${SMTP_HOST:-smtp.gmail.com}"
SMTP_PORT="${SMTP_PORT:-587}"
SMTP_USER="$SMTP_USER"
SMTP_PASSWORD="$SMTP_PASSWORD"
EMAIL_FROM="${EMAIL_FROM:-no-reply@eventscheduler.com}"

# App Runtime
PORT="${PORT:-8000}"
NODE_ENV="${NODE_ENV:-production}"
SLOT_GENERATION_DAYS="${SLOT_GENERATION_DAYS:-30}"
TEMPORAL_ENABLED="${TEMPORAL_ENABLED:-false}"
TEMPORAL_ADDRESS="${TEMPORAL_ADDRESS:-temporal:7233}"
REDIS_URI="${REDIS_URI:-redis://redis-service:6379}"
EOF

echo ""
echo "================================================================"
echo " ✅ Successfully dumped variables into .k8s-vars.env"
echo "================================================================"
cat .k8s-vars.env
echo "================================================================"
echo "👉 Tell Antigravity: 'I ran the dump script' to generate the K8s YAMLs."
echo ""
