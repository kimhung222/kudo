import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { onValue, ref } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { users } from '../../constants';
import { AuthContext } from '../../context/auth.provider';
import { realtimeDB } from '../../libs/firebase';
import { classNames } from '../../utils';

export interface FormProps {
  userId: number;
  content: string;
}

interface KudoFormProps {
  isRandomChoice?: boolean;
  isLoading: boolean;
  onSelectUser: (id: number) => void;
  selectedIds: number[];
  totalStep: number;
  activeStep: number;
  onNext: (values: FormProps, id: number) => void;
  onBack: () => void;
  defaultValues?: FormProps;
}

export const KudoForm: React.FC<KudoFormProps> = ({
  isLoading,
  selectedIds,
  totalStep,
  activeStep,
  onNext,
  onBack,
  onSelectUser,
  isRandomChoice = false,
  defaultValues = { userId: -1, content: '' }
}) => {
  const { userId: defaultUserId, content: defaultContent } = defaultValues;
  const [selectedUserId, setSelectedUserId] = useState(defaultUserId);
  const [isParticipant, setIsParticipant] = useState(false);
  const selectedName = users.find(user => user.id === selectedUserId)?.name || '';
  const [content, setContent] = useState(defaultContent);
  const [query, setQuery] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const isFinalStep = activeStep === totalStep - 1;
  const isFirstStep = activeStep === 0;
  const selectableUsers = users.filter(user => !selectedIds.includes(user.id));
  const filteredUsers =
    query === ''
      ? selectableUsers
      : selectableUsers.filter(user => {
          return user.name.toLowerCase().includes(query.toLowerCase());
        });

  const isRandomTitle = isRandomChoice && defaultUserId > 0;

  const title = selectedUserId < 0 ? 'Hãy chọn một người mà bạn muốn gửi gắm nỗi niềm' : '';

  const isSuggestionDisabled = isRandomTitle;

  const isValid = selectedUserId >= 0 && !!content.trim();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const { userId, content } = defaultValues;
    setSelectedUserId(userId);
    setContent(content);
  }, [JSON.stringify(defaultValues)]);

  useEffect(() => {
    const userRef = ref(realtimeDB, 'users');
    onValue(userRef, snapshot => {
      const meId = user?.uid || '';
      const data = snapshot.val();
      const isJoined = !!data?.[meId];
      setIsParticipant(isJoined);
    });
  }, []);

  return (
    <div className="flex self-stretch w-full flex-col flex-shrink-0 h-[80vh] px-4">
      <div className="mt-4 text-lg tracking-tight text-slate-900">{title}</div>
      <Combobox
        as="div"
        value={selectedUserId}
        onChange={(id: number) => {
          onSelectUser(id);
          setSelectedUserId(id);
        }}
        disabled={isSuggestionDisabled}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700 mt-4">
          Gửi tới
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            disabled={isSuggestionDisabled}
            className="w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={event => setQuery(event.target.value)}
            displayValue={(id: number) => {
              return users.find(user => user.id === id)?.name || '';
            }}
          />
          <Combobox.Button
            disabled={isSuggestionDisabled}
            className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Combobox.Button>

          {filteredUsers.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredUsers.map(user => (
                <Combobox.Option
                  key={user.id}
                  value={user.id}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : ''
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames('block truncate', selected ? 'font-semibold' : '')}
                      >
                        {user.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-indigo-600'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mt-4">
        Lời nhắn
      </label>
      <textarea
        style={{
          fontFamily: 'inherit',
          color: 'inherit'
        }}
        rows={5}
        id="comment"
        name="comment"
        placeholder="Để lại lời nhắn của bạn ở đây"
        className="block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ref={textAreaRef}
        value={content}
        onChange={e => setContent(e.target.value)}
        onInput={() => {
          if (textAreaRef?.current?.style) {
            textAreaRef.current.style.height = '';
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
          }
        }}
      />
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={onBack}
          disabled={isFirstStep}
          type="button"
          className={`
          ${isFirstStep ? 'invisible' : ''}
          inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          Quay lại
        </button>
        <button
          disabled={!isValid || isLoading || !isParticipant}
          onClick={() =>
            onNext(
              {
                userId: selectedUserId,
                content: content.trim()
              },
              selectedUserId
            )
          }
          type="button"
          className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
        >
          {isFinalStep ? 'Hoàn tất' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
};
