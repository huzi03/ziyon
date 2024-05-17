/*************************************

项目

**************************************/

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/v1\/receipts url script-response-body revenuecat_replace.js

[mitm]
hostname = api.revenuecat.com

/************************************/


/************************************/

// revenuecat_replace.js

var response = {
    "request_date": "2024-03-30T13:38:38Z",
    "request_date_ms": 1711805918552,
    "subscriber": {
        "entitlements": {
            "thenx_membership_entitlement": {
                "expires_date": "2099-04-30T13:37:29Z",
                "grace_period_expires_date": null,
                "product_identifier": "com.thenx.subscription",
                "purchase_date": "2024-05-30T13:37:29Z"
            }
        },
        "first_seen": "2024-03-30T13:37:04Z",
        "last_seen": "2024-03-30T13:37:04Z",
        "management_url": "https://apps.apple.com/account/subscriptions",
        "non_subscriptions": {},
        "original_app_user_id": "24435526",
        "original_application_version": "4",
        "original_purchase_date": "2024-03-30T13:37:32Z",
        "other_purchases": {},
        "subscriptions": {
            "com.thenx.subscription": {
                "auto_resume_date": null,
                "billing_issues_detected_at": null,
                "expires_date": "2099-04-30T13:37:29Z",
                "grace_period_expires_date": null,
                "is_sandbox": false,
                "original_purchase_date": "2024-03-30T13:37:32Z",
                "ownership_type": "PURCHASED",
                "period_type": "normal",
                "purchase_date": "2024-03-30T13:37:29Z",
                "refunded_at": null,
                "store": "app_store",
                "store_transaction_id": "390001298731048",
                "unsubscribe_detected_at": null
            }
        }
    }
};

$done({body: JSON.stringify(response)});
