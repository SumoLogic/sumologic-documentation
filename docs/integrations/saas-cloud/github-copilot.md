---
id: github-copilot
title: GitHub Copilot
sidebar_label: GitHub Copilot
description: The Sumo Logic app for GitHub Copilot provides visibility into Copilot adoption, engagement, and productivity across your organization, teams, and users.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/github_copilot.png')} alt="GitHub Copilot icon" width="50"/>

The Sumo Logic app for GitHub Copilot gives you clear visibility into Copilot adoption, engagement, and productivity across your organization, teams, and individual users. It consolidates key metrics such as active users, code generation and acceptance, lines of code, pull request activity, and agentic feature usage.

Dashboards break usage down by feature, IDE, language, and model, and compare teams to highlight inactive users and low adoption. Together, these help you optimize license utilization, target enablement efforts, and measure Copilot’s impact on developer productivity.

## Log types

This app uses Sumo Logic’s [GitHub Copilot source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/github-copilot-source/) to collect data from the GitHub Copilot platform. The source collects:

- **Organization Metrics**. Aggregated usage and engagement metrics for the whole organization, including active users, code acceptance, and pull request activity.
- **User Metrics**. Per-user usage and engagement metrics, including code acceptance, lines of code, and feature usage.
- **User Team Report**. A mapping of users to team membership, used for the team-level dashboard breakdowns.

## Sample log messages

<details>
<summary>User Metrics</summary>

```json
{
  "_type": "user",
  "ai_adoption_phase": {
    "phase": "Phase 1",
    "phase_number": 1,
    "version": "v1"
  },
  "ai_credits_used": 0,
  "code_acceptance_activity_count": 0,
  "code_generation_activity_count": 0,
  "day": "2026-10-23",
  "distinct_custom_agent_use_count": 0,
  "distinct_mcp_use_count": 0,
  "distinct_plugin_use_count": 0,
  "distinct_skill_use_count": 0,
  "distinct_slash_cmd_use_count": 0,
  "enterprise_id": "1000",
  "loc_added_sum": 0,
  "loc_deleted_sum": 0,
  "loc_suggested_to_add_sum": 0,
  "loc_suggested_to_delete_sum": 0,
  "organization_id": "2000000",
  "totals_by_client": [],
  "totals_by_custom_agent": [],
  "totals_by_feature": [],
  "totals_by_ide": [
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "ide": "intellij",
      "last_known_ide_version": {
        "ide_version": "262.10968.63",
        "sampled_at": "2026-10-23T11:11:25.944Z"
      },
      "last_known_plugin_version": {
        "plugin": "copilot-intellij",
        "plugin_version": "1.15.0-261-macos-arm64",
        "sampled_at": "2026-10-23T11:11:25.944Z"
      },
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 0
    }
  ],
  "totals_by_language_feature": [],
  "totals_by_language_model": [],
  "totals_by_mcp": [],
  "totals_by_model_feature": [],
  "totals_by_plugin": [],
  "totals_by_skill": [],
  "totals_by_slash_cmd": [],
  "used_agent": false,
  "used_chat": false,
  "user_id": 4000000,
  "user_initiated_interaction_count": 0,
  "user_login": "parth_langalia"
}
```

</details>

<details>
<summary>Org Metrics</summary>

```json
{
  "_type": "org",
  "code_acceptance_activity_count": 9,
  "code_generation_activity_count": 62,
  "daily_active_cli_users": 0,
  "daily_active_copilot_app_users": 1,
  "daily_active_copilot_cloud_agent_users": 2,
  "daily_active_copilot_code_review_users": 1,
  "daily_active_users": 59,
  "daily_passive_copilot_code_review_users": 1,
  "day": "2026-10-23",
  "distinct_custom_agent_use_count": 0,
  "distinct_mcp_use_count": 0,
  "distinct_plugin_use_count": 0,
  "distinct_skill_use_count": 1,
  "distinct_slash_cmd_use_count": 0,
  "enterprise_id": "1000",
  "loc_added_sum": 29,
  "loc_deleted_sum": 0,
  "loc_suggested_to_add_sum": 135,
  "loc_suggested_to_delete_sum": 0,
  "monthly_active_agent_users": 20,
  "monthly_active_chat_users": 24,
  "monthly_active_cli_users": 0,
  "monthly_active_copilot_app_users": 1,
  "monthly_active_copilot_cloud_agent_users": 17,
  "monthly_active_copilot_code_review_users": 5,
  "monthly_active_users": 124,
  "monthly_active_vscode_agent_users": 2,
  "monthly_passive_copilot_code_review_users": 11,
  "organization_id": "2000000",
  "pull_requests": {
    "copilot_suggestions_by_comment_type": [
      {
        "comment_type": "documentation",
        "total_copilot_applied_suggestions": 5,
        "total_copilot_suggestions": 5
      },
      {
        "comment_type": "bug",
        "total_copilot_applied_suggestions": 0,
        "total_copilot_suggestions": 2
      }
    ],
    "total_applied_suggestions": 5,
    "total_copilot_applied_suggestions": 5,
    "total_copilot_suggestions": 7,
    "total_created": 3,
    "total_created_by_copilot": 0,
    "total_merged": 0,
    "total_merged_created_by_copilot": 0,
    "total_merged_reviewed_by_copilot": 0,
    "total_reviewed": 4,
    "total_reviewed_by_copilot": 4,
    "total_suggestions": 7
  },
  "totals_by_ai_adoption_phase": [
    {
      "avg_code_acceptance_activities": 0,
      "avg_code_generation_activities": 0,
      "avg_loc_added": 0,
      "avg_loc_deleted": 0,
      "avg_pull_requests_created": 0,
      "avg_pull_requests_median_minutes_to_merge": 0,
      "avg_pull_requests_merged": 0,
      "avg_pull_requests_minutes_to_review": 0,
      "avg_pull_requests_review_cycles": 0,
      "avg_pull_requests_reviewed": 0,
      "avg_user_initiated_interactions": 0,
      "phase": "No Cohort",
      "phase_number": 0,
      "total_engaged_users": 27,
      "total_pull_requests_merged": 0,
      "users_in_phase_28d": 73
    },
    {
      "avg_code_acceptance_activities": 0.36,
      "avg_code_generation_activities": 2.36,
      "avg_loc_added": 1.18,
      "avg_loc_deleted": 0,
      "avg_pull_requests_created": 0,
      "avg_pull_requests_median_minutes_to_merge": 0,
      "avg_pull_requests_merged": 0,
      "avg_pull_requests_minutes_to_review": 0,
      "avg_pull_requests_review_cycles": 0,
      "avg_pull_requests_reviewed": 0,
      "avg_user_initiated_interactions": 0.18,
      "phase": "Phase 1",
      "phase_number": 1,
      "total_engaged_users": 22,
      "total_pull_requests_merged": 0,
      "users_in_phase_28d": 39
    },
    {
      "avg_code_acceptance_activities": 0,
      "avg_code_generation_activities": 0,
      "avg_loc_added": 0,
      "avg_loc_deleted": 0,
      "avg_pull_requests_created": 0,
      "avg_pull_requests_median_minutes_to_merge": 0,
      "avg_pull_requests_merged": 0,
      "avg_pull_requests_minutes_to_review": 0,
      "avg_pull_requests_review_cycles": 0,
      "avg_pull_requests_reviewed": 0,
      "avg_user_initiated_interactions": 0,
      "phase": "Phase 2",
      "phase_number": 2,
      "total_engaged_users": 0,
      "total_pull_requests_merged": 0,
      "users_in_phase_28d": 1
    },
    {
      "avg_code_acceptance_activities": 0.1,
      "avg_code_generation_activities": 1,
      "avg_loc_added": 0.3,
      "avg_loc_deleted": 0,
      "avg_pull_requests_created": 0.3,
      "avg_pull_requests_median_minutes_to_merge": 0,
      "avg_pull_requests_merged": 0,
      "avg_pull_requests_minutes_to_review": 0,
      "avg_pull_requests_review_cycles": 0,
      "avg_pull_requests_reviewed": 0,
      "avg_user_initiated_interactions": 0.4,
      "phase": "Phase 3",
      "phase_number": 3,
      "total_engaged_users": 10,
      "total_pull_requests_merged": 0,
      "users_in_phase_28d": 16
    }
  ],
  "totals_by_client": [
    {
      "client": "cloud_agent",
      "request_count": 12,
      "session_count": 1,
      "token_usage": {
        "avg_tokens_per_request": 24940.67,
        "output_tokens_sum": 2173,
        "prompt_tokens_sum": 297115
      },
      "totals_by_model": [
        {
          "model": "gpt-6-luna",
          "model_selection_mode": "product_selected",
          "request_count": 11,
          "token_usage": {
            "avg_tokens_per_request": 27130,
            "output_tokens_sum": 2139,
            "prompt_tokens_sum": 296291
          }
        },
        {
          "model": "unknown",
          "model_selection_mode": "product_selected",
          "request_count": 1,
          "token_usage": {
            "avg_tokens_per_request": 858,
            "output_tokens_sum": 34,
            "prompt_tokens_sum": 824
          }
        }
      ]
    },
    {
      "client": "code_review",
      "request_count": 1164,
      "session_count": 225,
      "token_usage": {
        "avg_tokens_per_request": 50543.06,
        "output_tokens_sum": 639872,
        "prompt_tokens_sum": 58192250
      },
      "totals_by_model": [
        {
          "model": "unknown",
          "model_selection_mode": "product_selected",
          "request_count": 1164,
          "token_usage": {
            "avg_tokens_per_request": 50543.06,
            "output_tokens_sum": 639872,
            "prompt_tokens_sum": 58192250
          }
        }
      ]
    },
    {
      "client": "github_app",
      "request_count": 14,
      "session_count": 2,
      "token_usage": {
        "avg_tokens_per_request": 73749.07,
        "output_tokens_sum": 3654,
        "prompt_tokens_sum": 1028833
      },
      "totals_by_model": [
        {
          "model": "claude-haiku-5.5",
          "model_selection_mode": "user_selected",
          "request_count": 1,
          "token_usage": {
            "avg_tokens_per_request": 1335,
            "output_tokens_sum": 5,
            "prompt_tokens_sum": 1330
          }
        },
        {
          "model": "claude-sonnet-5.5",
          "model_selection_mode": "user_selected",
          "request_count": 13,
          "token_usage": {
            "avg_tokens_per_request": 79319.38,
            "output_tokens_sum": 3649,
            "prompt_tokens_sum": 1027503
          }
        }
      ]
    },
    {
      "client": "github_web",
      "request_count": 46,
      "session_count": 0,
      "token_usage": {
        "avg_tokens_per_request": 26621.91,
        "output_tokens_sum": 24682,
        "prompt_tokens_sum": 1199926
      },
      "totals_by_model": [
        {
          "model": "claude-opus-5",
          "model_selection_mode": "user_selected",
          "request_count": 4,
          "token_usage": {
            "avg_tokens_per_request": 39942,
            "output_tokens_sum": 6353,
            "prompt_tokens_sum": 153415
          }
        },
        {
          "model": "claude-opus-5.5",
          "model_selection_mode": "user_selected",
          "request_count": 5,
          "token_usage": {
            "avg_tokens_per_request": 29792.2,
            "output_tokens_sum": 4362,
            "prompt_tokens_sum": 144599
          }
        },
        {
          "model": "gpt-5.3-codex",
          "model_selection_mode": "unknown",
          "request_count": 10,
          "token_usage": {
            "avg_tokens_per_request": 27692.3,
            "output_tokens_sum": 7961,
            "prompt_tokens_sum": 268962
          }
        },
        {
          "model": "gpt-6.1-sol",
          "model_selection_mode": "other",
          "request_count": 20,
          "token_usage": {
            "avg_tokens_per_request": 31555.85,
            "output_tokens_sum": 5963,
            "prompt_tokens_sum": 625154
          }
        },
        {
          "model": "unknown",
          "model_selection_mode": "user_selected",
          "request_count": 7,
          "token_usage": {
            "avg_tokens_per_request": 1119.86,
            "output_tokens_sum": 43,
            "prompt_tokens_sum": 7796
          }
        }
      ]
    },
    {
      "client": "jetbrains",
      "request_count": 1,
      "session_count": 1,
      "token_usage": {
        "avg_tokens_per_request": 76321,
        "output_tokens_sum": 135,
        "prompt_tokens_sum": 76186
      },
      "totals_by_model": [
        {
          "model": "claude-opus-5.5",
          "model_selection_mode": "user_selected",
          "request_count": 1,
          "token_usage": {
            "avg_tokens_per_request": 76321,
            "output_tokens_sum": 135,
            "prompt_tokens_sum": 76186
          }
        }
      ]
    },
    {
      "client": "other",
      "request_count": 1,
      "session_count": 0,
      "token_usage": {
        "avg_tokens_per_request": 1398,
        "output_tokens_sum": 184,
        "prompt_tokens_sum": 1214
      },
      "totals_by_model": [
        {
          "model": "gpt-4.1",
          "model_selection_mode": "user_selected",
          "request_count": 1,
          "token_usage": {
            "avg_tokens_per_request": 1398,
            "output_tokens_sum": 184,
            "prompt_tokens_sum": 1214
          }
        }
      ]
    },
    {
      "client": "vscode",
      "request_count": 41,
      "session_count": 3,
      "token_usage": {
        "avg_tokens_per_request": 118179.46,
        "output_tokens_sum": 14105,
        "prompt_tokens_sum": 4831253
      },
      "totals_by_model": [
        {
          "model": "gpt-6-astra",
          "model_selection_mode": "user_selected",
          "request_count": 20,
          "token_usage": {
            "avg_tokens_per_request": 238481,
            "output_tokens_sum": 12832,
            "prompt_tokens_sum": 4756788
          }
        },
        {
          "model": "gpt-6-luna",
          "model_selection_mode": "other",
          "request_count": 3,
          "token_usage": {
            "avg_tokens_per_request": 16957.67,
            "output_tokens_sum": 1015,
            "prompt_tokens_sum": 49858
          }
        },
        {
          "model": "unknown",
          "model_selection_mode": "user_selected",
          "request_count": 18,
          "token_usage": {
            "avg_tokens_per_request": 1381.39,
            "output_tokens_sum": 258,
            "prompt_tokens_sum": 24607
          }
        }
      ]
    }
  ],
  "totals_by_copilot_app": {
    "prompt_count": 4,
    "request_count": 14,
    "session_count": 2,
    "token_usage": {
      "avg_tokens_per_request": 73749.07,
      "output_tokens_sum": 3654,
      "prompt_tokens_sum": 1028833
    }
  },
  "totals_by_custom_agent": [],
  "totals_by_feature": [
    {
      "code_acceptance_activity_count": 9,
      "code_generation_activity_count": 62,
      "feature": "code_completion",
      "loc_added_sum": 29,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 135,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "chat_panel_agent_mode",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 4
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "copilot_app",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 4
    }
  ],
  "totals_by_ide": [
    {
      "code_acceptance_activity_count": 8,
      "code_generation_activity_count": 61,
      "ide": "intellij",
      "loc_added_sum": 28,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 134,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "ide": "vscode",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 4
    },
    {
      "code_acceptance_activity_count": 1,
      "code_generation_activity_count": 1,
      "ide": "pycharm",
      "loc_added_sum": 1,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 1,
      "loc_suggested_to_delete_sum": 0,
      "user_initiated_interaction_count": 0
    }
  ],
  "totals_by_language_feature": [
    {
      "code_acceptance_activity_count": 8,
      "code_generation_activity_count": 53,
      "feature": "code_completion",
      "language": "scala",
      "loc_added_sum": 28,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 126,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 5,
      "feature": "code_completion",
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 5,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 1,
      "code_generation_activity_count": 1,
      "feature": "code_completion",
      "language": "javascript",
      "loc_added_sum": 1,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 1,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 2,
      "feature": "code_completion",
      "language": "terraform",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 2,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 1,
      "feature": "code_completion",
      "language": "groovy",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 1,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "chat_panel_agent_mode",
      "language": "ruby",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "chat_panel_agent_mode",
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "copilot_app",
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0
    }
  ],
  "totals_by_language_model": [
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "language": "ruby",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "gpt-6-astra"
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "claude-haiku-5.5"
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "claude-sonnet-5.5"
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "language": "unknown",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "gpt-6-astra"
    }
  ],
  "totals_by_mcp": [],
  "totals_by_model_feature": [
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "chat_panel_agent_mode",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "gpt-6-astra",
      "user_initiated_interaction_count": 4
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "copilot_app",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "claude-sonnet-5.5",
      "user_initiated_interaction_count": 3
    },
    {
      "code_acceptance_activity_count": 0,
      "code_generation_activity_count": 0,
      "feature": "copilot_app",
      "loc_added_sum": 0,
      "loc_deleted_sum": 0,
      "loc_suggested_to_add_sum": 0,
      "loc_suggested_to_delete_sum": 0,
      "model": "claude-haiku-5.5",
      "user_initiated_interaction_count": 1
    }
  ],
  "totals_by_plugin": [],
  "totals_by_skill": [
    {
      "interaction_count": 13,
      "skill": "other"
    }
  ],
  "totals_by_slash_cmd": [],
  "user_initiated_interaction_count": 8,
  "weekly_active_cli_users": 0,
  "weekly_active_copilot_app_users": 1,
  "weekly_active_copilot_cloud_agent_users": 9,
  "weekly_active_copilot_code_review_users": 1,
  "weekly_active_users": 101,
  "weekly_active_vscode_agent_users": 0,
  "weekly_passive_copilot_code_review_users": 8
}
```

</details>

<details>
<summary>User Team Report</summary>

```json
{
  "_type": "userTeam",
  "day": "2026-10-27",
  "organization_id": "2000000",
  "slug": "example-team",
  "team_id": 3000000,
  "user_id": 5000000,
  "user_login": "parth_langalia"
}
```

</details>

## Sample queries

```sumo title="Code Generation Activities"
_sourceCategory={{Logsdatasource}} "org" code_generation_activity_count
| json "_type", "day", "organization_id", "code_generation_activity_count" as _type, day, organization_id, gen nodrop
| where _type = "org"

// Global filter
| where if("{{organization_id}}" = "*", true, organization_id matches "{{organization_id}}")

| first(gen) as gen group by day, organization_id
| sum(gen) as total_generations
| fields total_generations
```

```sumo title="Users by AI Adoption Phase"
_sourceCategory={{Logsdatasource}} "user" ai_adoption_phase phase
| json "_type", "day", "user_id", "user_login", "organization_id", "ai_adoption_phase.phase" as _type, day, user_id, user_login, organization_id, phase nodrop
| where _type = "user"

// Global filter
| where if("{{organization_id}}" = "*", true, organization_id matches "{{organization_id}}")
| where if("{{user_login}}" = "*", true, user_login matches "{{user_login}}")

| first(phase) as phase group by user_id
| where !isBlank(phase)
| count by phase
| sort by _count, phase asc
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for GitHub Copilot](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/github-copilot-source/) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your GitHub Copilot app is properly integrated and configured to collect and analyze your GitHub Copilot data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the GitHub Copilot dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Org Adoption and Code Activity

The **GitHub Copilot - Org Adoption and Code Activity** dashboard gives an organization-level view of Copilot adoption and coding activity. It tracks code acceptance rate, lines of code added, user-initiated interactions, and daily, weekly, and monthly active users. It compares code generation against acceptance and lines suggested against lines added, with breakdowns by feature, IDE, language, and model. AI adoption phase panels show how users progress and how productivity differs between phases. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GitHub+Copilot/GitHub-Copilot-Org-Adoption-and-Code-Activity.png')} alt="GitHub Copilot Org Adoption and Code Activity dashboard" />

### Org Pull Requests and Agentic Features

The **GitHub Copilot - Org Pull Requests and Agentic Features** dashboard shows how Copilot affects pull request workflows and how your organization uses its agentic and extensibility features. It tracks pull requests reviewed by Copilot, pull request volume, median time to merge, and Copilot review suggestions by comment type and apply rate. It also covers active users by product, VS Code agent sessions, usage of skills, MCP, plugins, slash commands, and custom agents, and Copilot app sessions and token usage. The dashboard helps you assess Copilot’s effect on review speed and quality and track adoption of advanced capabilities. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GitHub+Copilot/GitHub-Copilot-Org-Pull-Requests-and-Agentic-Features.png')} alt="GitHub Copilot Org Pull Requests and Agentic Features dashboard" />

### Team Analysis

The **GitHub Copilot - Team Analysis** dashboard gives a team-level view of Copilot usage by applying team membership to per-user activity. It tracks team size, active users, code acceptance rate, lines of code added, and AI credits used, and compares teams over time on a selected metric. Breakdowns by feature, IDE, language, model, AI adoption phase, and capability show how each team uses Copilot. A panel listing inactive team members helps you find where adoption is lagging and target training or license reallocation. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GitHub+Copilot/GitHub-Copilot-Team-Analysis.png')} alt="GitHub Copilot Team Analysis dashboard" />

### User Analysis

The **GitHub Copilot - User Analysis** dashboard gives a user-level view of Copilot activity. It tracks active users, code generation activities, user-initiated interactions, code acceptance rate, lines of code added, and AI credits used. A per-user activity summary and top users by a selected metric sit alongside breakdowns by feature, IDE, language, and model, and panels for AI adoption phases, extensibility usage, and IDE and plugin versions. The dashboard helps you identify power users, spot developers who need support, and keep IDE and plugin versions current. <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/GitHub+Copilot/GitHub-Copilot-User-Analysis.png')} alt="GitHub Copilot User Analysis dashboard" />

## Upgrading the GitHub Copilot app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the GitHub Copilot app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
