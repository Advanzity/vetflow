'use client';

import { useState } from 'react';
import { Card, Input, Select, Flex, Text } from '@/once-ui/components';
import { MediaUpload } from '@/once-ui/modules';

export const ReportLayout = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [orientation, setOrientation] = useState('portrait');
  const [pageSize, setPageSize] = useState('a4');
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = async (file: File) => {
    // In a real implementation, this would upload to a file server
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <Flex direction="column" gap="24" padding="24">
        <Text variant="heading-strong-m">Report Layout</Text>

        <Input
          id="title"
          label="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Flex direction="column" gap="8">
          <Text variant="heading-strong-s">Clinic Logo</Text>
          <MediaUpload
            onFileUpload={handleLogoUpload}
            initialPreviewImage={logo}
            accept="image/*"
            aspectRatio="3/1"
          />
        </Flex>

        <Select
          id="orientation"
          label="Page Orientation"
          value={orientation}
          options={[
            { label: 'Portrait', value: 'portrait' },
            { label: 'Landscape', value: 'landscape' },
          ]}
          onSelect={(option) => setOrientation(option.value)}
        />

        <Select
          id="pageSize"
          label="Page Size"
          value={pageSize}
          options={[
            { label: 'A4', value: 'a4' },
            { label: 'Letter', value: 'letter' },
            { label: 'Legal', value: 'legal' },
          ]}
          onSelect={(option) => setPageSize(option.value)}
        />
      </Flex>
    </Card>
  );
};
