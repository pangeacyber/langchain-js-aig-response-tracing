import type { CallbackManagerForChainRun } from '@langchain/core/callbacks/manager';
import type { AIMessage } from '@langchain/core/messages';
import { Runnable, type RunnableConfig } from '@langchain/core/runnables';
import { AIGuardService, PangeaConfig } from 'pangea-node-sdk';

export class PangeaAiGuardRunnable<
  RunInput extends AIMessage = AIMessage,
> extends Runnable<RunInput, RunInput> {
  static lc_name() {
    // biome-ignore lint/nursery/noSecrets: false positive.
    return 'PangeaAiGuardRunnable';
  }

  lc_namespace = ['pangeacyber', 'runnables'];

  private client;

  constructor(token: string, domain = 'aws.us.pangea.cloud') {
    super();
    this.client = new AIGuardService(token, new PangeaConfig({ domain }));
  }

  async _invoke(
    input: RunInput,
    _config?: Partial<RunnableConfig>,
    _runManager?: CallbackManagerForChainRun
  ): Promise<RunInput> {
    const text = input.content as string;
    if (!text) {
      return input;
    }

    // Run it through AI Guard.
    const redacted = await this.client.guardText({
      text,
      recipe: 'pangea_llm_response_guard',
    });
    if (!redacted.result) {
      throw new Error('Failed to guard text.');
    }

    if (redacted.result.redacted_prompt) {
      input.content = redacted.result.redacted_prompt;
    }

    return input;
  }

  override invoke(
    input: RunInput,
    config: Partial<RunnableConfig> = {}
  ): Promise<RunInput> {
    return this._callWithConfig(this._invoke, input, config);
  }
}